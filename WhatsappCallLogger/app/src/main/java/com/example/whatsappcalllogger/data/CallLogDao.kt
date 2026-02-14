package com.example.whatsappcalllogger.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query

@Dao
interface CallLogDao {
    @Query("SELECT * FROM call_logs WHERE isSynced = 0")
    suspend fun getUnsyncedLogs(): List<CallLogEntity>

    @Insert
    suspend fun insert(callLog: CallLogEntity)

    @Query("UPDATE call_logs SET isSynced = 1 WHERE id = :id")
    suspend fun markAsSynced(id: Int)
    
    @Delete
    suspend fun delete(callLog: CallLogEntity)
}
