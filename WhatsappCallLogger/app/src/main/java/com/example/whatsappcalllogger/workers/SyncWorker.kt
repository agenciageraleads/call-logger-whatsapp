package com.example.whatsappcalllogger.workers

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.example.whatsappcalllogger.data.AppDatabase
import com.example.whatsappcalllogger.model.WhatsAppCall
import com.example.whatsappcalllogger.model.WhatsAppCallType
import com.example.whatsappcalllogger.model.CallStatus
import com.example.whatsappcalllogger.network.NetworkUtils
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class SyncWorker(appContext: Context, workerParams: WorkerParameters) : CoroutineWorker(appContext, workerParams) {

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        val database = AppDatabase.getDatabase(applicationContext)
        val unsyncedLogs = database.callLogDao().getUnsyncedLogs()

        if (unsyncedLogs.isEmpty()) {
            return@withContext Result.success()
        }

        var hadFailure = false

        unsyncedLogs.forEach { log ->
            val call = WhatsAppCall(
                id = log.id,
                callType = WhatsAppCallType.valueOf(log.callType),
                callPerson = log.callPerson,
                phoneNumber = "Unknown", // Assuming phone number not stored locally for now or not needed for sync
                callTime = log.callTime,
                callDuration = log.callDuration,
                callStatus = CallStatus.valueOf(log.callStatus)
            )

            val (success, _) = NetworkUtils.sendCallToServerBlocking(applicationContext, call)
            if (success) {
                database.callLogDao().markAsSynced(log.id)
            } else {
                hadFailure = true
            }
        }

        if (hadFailure) Result.retry() else Result.success()
    }
}
