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
            
            // Check for call style notification or specific extras
            // Note: WhatsApp call notifications can be tricky. This logic depends on specific extras.
            
            val callTypeInt = extras?.getInt("android.callType")
            
            // If callTypeInt is present, it's a call notification attempt
            if (callTypeInt != null && callTypeInt != 0) {
                 val callType = if (callTypeInt == 1) WhatsAppCallType.INCOMING else WhatsAppCallType.OUTGOING
                 
                 var personName = "Unknown"
                 val callPerson = extras.get("android.callPerson")
                 // Also try android.title or others if needed
                 
                 if (callPerson != null && callPerson is Person) {
                    personName = callPerson.name?.toString() ?: "Unknown"
                 } else {
                     personName = extras.getString(Notification.EXTRA_TITLE) ?: "Unknown"
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
