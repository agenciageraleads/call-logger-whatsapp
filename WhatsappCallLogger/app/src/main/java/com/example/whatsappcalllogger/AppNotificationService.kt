package com.example.whatsappcalllogger

import android.app.Person
import android.content.Intent
import android.provider.Settings
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.example.whatsappcalllogger.network.LogRequest
import com.example.whatsappcalllogger.network.LogResponse
import com.example.whatsappcalllogger.network.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

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
            
            val callTypeInt = extras?.getInt("android.callType")
            
            if (callTypeInt == null || callTypeInt == 0) {
                 return
            }

            val callType = if (callTypeInt == 1) WhatsAppCallType.INCOMING else WhatsAppCallType.OUTGOING
            val callPerson = extras.get("android.callPerson")
            val supplier = extras.get("android.people.list")
            
            var personName = "Unknown"
            
            if (callPerson != null && callPerson is Person) {
                personName = callPerson.name?.toString() ?: "Unknown"
            } else if (supplier != null && supplier is ArrayList<*> && supplier.isNotEmpty()) {
                 val p = supplier[0] as? Person
                 if (p != null) {
                     personName = p.name?.toString() ?: "Unknown"
                 }
            }

            Log.d("AppNotificationService", "Detected: $personName - $callType")

            if (onGoingCall == null) {
                onGoingCall = WhatsAppCall(
                    id = sbn.id,
                    callType = callType,
                    callPerson = personName,
                    phoneNumber = "",
                    callTime = System.currentTimeMillis(),
                    callDuration = 0
                )
            } else {
                 onGoingCall = onGoingCall?.copy(callPerson = personName)
            }
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification?) {
        if (sbn?.packageName == "com.whatsapp") {
             val currentCall = onGoingCall
             if (currentCall != null) {
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
                 
                 // 2. Send to Server
                 sendToServer(finalCall)
                 
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

    private fun sendToServer(call: WhatsAppCall) {
        val deviceId = Settings.Secure.getString(contentResolver, Settings.Secure.ANDROID_ID) ?: "unknown_device"
        
        val request = LogRequest(
            deviceId = deviceId,
            contactName = call.callPerson,
            duration = call.callDuration,
            type = call.callType.name,
            status = call.callStatus.name,
            timestamp = call.callTime
        )

        RetrofitClient.instance.sendLog(request).enqueue(object : Callback<LogResponse> {
            override fun onResponse(call: Call<LogResponse>, response: Response<LogResponse>) {
                if (response.isSuccessful) {
                    Log.d("AppNotificationService", "Log sent successfully: ${response.body()?.logId}")
                } else {
                    Log.e("AppNotificationService", "Failed to send log: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<LogResponse>, t: Throwable) {
                Log.e("AppNotificationService", "Network Error", t)
            }
        })
    }
}
