package com.example.whatsappcalllogger.network

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("/api/logs")
    fun sendLog(@Body request: LogRequest): Call<LogResponse>
}
