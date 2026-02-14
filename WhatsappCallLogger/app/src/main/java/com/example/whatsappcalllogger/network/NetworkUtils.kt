package com.example.whatsappcalllogger.network

import android.content.Context
import android.provider.Settings
import android.util.Log
import com.example.whatsappcalllogger.model.WhatsAppCall
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object NetworkUtils {
    
    fun sendCallToServer(context: Context, call: WhatsAppCall, onResult: (Boolean, String?) -> Unit = { _, _ -> }) {
        val deviceId = Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID) ?: "unknown_device"
        
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
                    val logId = response.body()?.logId
                    Log.d("NetworkUtils", "Log sent successfully: $logId")
                    onResult(true, logId)
                } else {
                    Log.e("NetworkUtils", "Failed to send log: ${response.code()}")
                    onResult(false, "Error: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<LogResponse>, t: Throwable) {
                Log.e("NetworkUtils", "Network Error", t)
                onResult(false, t.message)
            }
        })
    }

    /**
     * Blocking version for WorkManager workers. Returns (success, logIdOrError).
     * This avoids `enqueue()` finishing after the worker already returned.
     */
    fun sendCallToServerBlocking(context: Context, call: WhatsAppCall): Pair<Boolean, String?> {
        val deviceId =
            Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID) ?: "unknown_device"

        val request = LogRequest(
            deviceId = deviceId,
            contactName = call.callPerson,
            duration = call.callDuration,
            type = call.callType.name,
            status = call.callStatus.name,
            timestamp = call.callTime
        )

        return try {
            val response = RetrofitClient.instance.sendLog(request).execute()
            if (response.isSuccessful) {
                val logId = response.body()?.logId
                Log.d("NetworkUtils", "Log sent successfully (blocking): $logId")
                true to logId
            } else {
                Log.e("NetworkUtils", "Failed to send log (blocking): ${response.code()}")
                false to "Error: ${response.code()}"
            }
        } catch (t: Throwable) {
            Log.e("NetworkUtils", "Network Error (blocking)", t)
            false to (t.message ?: "Network error")
        }
    }
}
