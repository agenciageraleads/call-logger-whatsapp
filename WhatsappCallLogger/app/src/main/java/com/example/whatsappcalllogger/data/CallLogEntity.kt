package com.example.whatsappcalllogger.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "call_logs")
data class CallLogEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val callPerson: String,
    val callDuration: Long,
    val callType: String,
    val callStatus: String,
    val callTime: Long,
    val isSynced: Boolean = false
)
