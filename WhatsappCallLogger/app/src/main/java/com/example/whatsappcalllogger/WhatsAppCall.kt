package com.example.whatsappcalllogger

enum class WhatsAppCallType {
    INCOMING,
    OUTGOING
}

enum class CallStatus {
    MISSED,
    RECEIVED,
    DIALED,
    PENDING
}

data class WhatsAppCall(
    val id: Int,
    val callType: WhatsAppCallType,
    val callPerson: String = "Unknown",
    val phoneNumber: String?,
    val callTime: Long,
    val callDuration: Long,
    val callStatus: CallStatus = CallStatus.PENDING
)
