package com.example.whatsappcalllogger

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.app.Person
import android.app.Notification
import android.content.Intent
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.example.whatsappcalllogger.model.WhatsAppCall
import com.example.whatsappcalllogger.model.WhatsAppCallType
import com.example.whatsappcalllogger.model.CallStatus
import com.example.whatsappcalllogger.data.AppDatabase
import com.example.whatsappcalllogger.data.CallLogEntity
import com.example.whatsappcalllogger.workers.SyncWorker
import androidx.work.OneTimeWorkRequest
import androidx.work.WorkManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class AppNotificationService : NotificationListenerService() {

    private var onGoingCall: WhatsAppCall? = null

    companion object {
        const val ACTION_CALL_LOGGED = "com.example.whatsappcalllogger.ACTION_CALL_LOGGED"
    }

    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        val packageName = sbn?.packageName
        if (packageName == "com.whatsapp") {
            val notification = sbn.notification
            val extras = notification?.extras
            
            // Log extras for debugging
            if (extras != null) {
                Log.d("AppNotificationService", "--- WhatsApp Notification ---")
                for (key in extras.keySet()) {
                    Log.d("AppNotificationService", "Extra: $key = ${extras.get(key)}")
                }
            }

            val category = notification?.category
            val title = extras?.getString(Notification.EXTRA_TITLE) ?: ""
            val text = extras?.getCharSequence(Notification.EXTRA_TEXT)?.toString() ?: ""
            
            val isCall = category == Notification.CATEGORY_CALL || 
                         title.contains("chamada", ignoreCase = true) || 
                         text.contains("chamada", ignoreCase = true) ||
                         extras?.containsKey("android.callType") == true

            if (isCall) {
                val callTypeInt = extras?.getInt("android.callType") ?: 0
                val callType = if (callTypeInt == 1 || text.contains("recebida", ignoreCase = true) || title.contains("recebida", ignoreCase = true)) {
                    WhatsAppCallType.INCOMING
                } else {
                    WhatsAppCallType.OUTGOING
                }
                 
                var personName = title
                val callPerson = extras?.get("android.callPerson")
                if (callPerson != null && callPerson is Person) {
                    personName = callPerson.name?.toString() ?: personName
                }

                if (personName == "WhatsApp" || personName.isBlank()) {
                    personName = "Desconhecido"
                }

                Log.d("AppNotificationService", "Detected Call: $personName - $callType")

                if (onGoingCall == null) {
                    onGoingCall = WhatsAppCall(
                        id = sbn.id,
                        callType = callType,
                        callPerson = personName,
                        phoneNumber = "",
                        callTime = System.currentTimeMillis(),
                        callDuration = 0
                    )
                }
            }
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification?) {
        if (sbn?.packageName == "com.whatsapp") {
             // Check if this matches our ongoing call ID or just assume ongoing call ended if whatsapp notification removed
             // Better logic: match ID. But for now, simple check.
             
             val currentCall = onGoingCall
             if (currentCall != null && sbn.id == currentCall.id) {
                 // Calculate duration
                 val endTime = System.currentTimeMillis()
                 val duration = (endTime - currentCall.callTime) / 1000
                 val finalStatus = if (duration > 0) CallStatus.RECEIVED else CallStatus.MISSED
                 
                 val finalCall = currentCall.copy(
                     callDuration = duration,
                     callStatus = finalStatus
                 )
                 
                 Log.d("AppNotificationService", "Call Ended: $finalCall")
                 
                 // 1. Broadcast to UI
                 broadcastCallLog(finalCall)
                 
                 // 2. Save to Room & Trigger Sync
                 saveAndSync(finalCall)
                 
                 onGoingCall = null
             }
        }
    }
    
    private fun broadcastCallLog(call: WhatsAppCall) {
        val intent = Intent(ACTION_CALL_LOGGED)
        intent.putExtra("person", call.callPerson)
        intent.putExtra("duration", call.callDuration)
        intent.putExtra("type", call.callType.name)
        intent.putExtra("status", call.callStatus.name)
        intent.putExtra("time", call.callTime)
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent)
    }

    private fun saveAndSync(call: WhatsAppCall) {
        CoroutineScope(Dispatchers.IO).launch {
            val database = AppDatabase.getDatabase(applicationContext)
            
            val entity = CallLogEntity(
                callPerson = call.callPerson,
                callDuration = call.callDuration,
                callType = call.callType.name,
                callStatus = call.callStatus.name,
                callTime = call.callTime,
                isSynced = false
            )
            
            database.callLogDao().insert(entity)
            Log.d("AppNotificationService", "Log saved to Room. Triggering Worker.")
            
            val syncRequest = OneTimeWorkRequest.Builder(SyncWorker::class.java).build()
            WorkManager.getInstance(applicationContext).enqueue(syncRequest)
        }
    }
}
