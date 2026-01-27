package com.example.whatsappcalllogger.network

data class LogRequest(
    val deviceId: String,
    val contactName: String,
    val duration: Long,
    val type: String,
    val status: String,
    val timestamp: Long
)

data class LogResponse(
    val success: Boolean,
    val logId: String?,
    val error: String?
)
