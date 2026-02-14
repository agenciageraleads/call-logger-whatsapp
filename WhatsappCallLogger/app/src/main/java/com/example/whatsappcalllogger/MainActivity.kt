package com.example.whatsappcalllogger

import android.content.BroadcastReceiver
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.provider.Settings
import android.text.TextUtils
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class MainActivity : AppCompatActivity() {

    private lateinit var btnPermission: Button
    private lateinit var btnTest: Button
    private lateinit var tvStatus: TextView
    private lateinit var tvLogs: TextView

    private val callLogReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == AppNotificationService.ACTION_CALL_LOGGED) {
                val person = intent.getStringExtra("person") ?: "Unknown"
                val duration = intent.getLongExtra("duration", 0)
                val type = intent.getStringExtra("type") ?: "?"
                val status = intent.getStringExtra("status") ?: "?"
                val time = intent.getLongExtra("time", System.currentTimeMillis())

                val dateFormat = SimpleDateFormat("HH:mm:ss", Locale.getDefault())
                val timeStr = dateFormat.format(Date(time))

                val log = "[$timeStr] $person\nTipo: $type | Status: $status | Dur: ${duration}s\n----------------\n"
                
                appendLog(log)
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnPermission = findViewById(R.id.btnPermission)
        btnTest = findViewById(R.id.btnTest)
        tvStatus = findViewById(R.id.tvStatus)
        tvLogs = findViewById(R.id.tvLogs)

        btnPermission.setOnClickListener {
            startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS))
        }

        btnTest.setOnClickListener {
            sendTestLog()
        }

        LocalBroadcastManager.getInstance(this).registerReceiver(
            callLogReceiver,
            IntentFilter(AppNotificationService.ACTION_CALL_LOGGED)
        )
    }

    override fun onDestroy() {
        super.onDestroy()
        LocalBroadcastManager.getInstance(this).unregisterReceiver(callLogReceiver)
    }

    override fun onResume() {
        super.onResume()
        checkPermission()
    }

    private fun checkPermission() {
        if (!isNotificationServiceEnabled()) {
            tvStatus.text = "Status: Permissão Necessária"
            tvStatus.setTextColor(resources.getColor(android.R.color.holo_red_dark, theme))
            btnPermission.visibility = View.VISIBLE
        } else {
            tvStatus.text = "Status: Serviço Ativo e Monitorando"
            tvStatus.setTextColor(resources.getColor(android.R.color.holo_green_dark, theme))
            btnPermission.visibility = View.GONE
        }
    }

    private fun isNotificationServiceEnabled(): Boolean {
        val pkgName = packageName
        val flat = Settings.Secure.getString(contentResolver, "enabled_notification_listeners")
        if (!TextUtils.isEmpty(flat)) {
            val names = flat.split(":").toTypedArray()
            for (name in names) {
                val componentName = ComponentName.unflattenFromString(name)
                if (componentName != null) {
                    if (TextUtils.equals(pkgName, componentName.packageName)) {
                        return true
                    }
                }
            }
        }
        return false
    }

    private fun appendLog(text: String) {
        val currentText = tvLogs.text.toString()
        if (currentText == "Aguardando chamadas...") {
            tvLogs.text = text
        } else {
            tvLogs.text = text + currentText
        }
    }

    private fun sendTestLog() {
        // Create a test call object
        val testCall = com.example.whatsappcalllogger.model.WhatsAppCall(
            id = 0,
            callType = com.example.whatsappcalllogger.model.WhatsAppCallType.INCOMING,
            callPerson = "Teste Conexão Manual",
            phoneNumber = "000000",
            callTime = System.currentTimeMillis(),
            callDuration = 15, // 15 seconds
            callStatus = com.example.whatsappcalllogger.model.CallStatus.RECEIVED
        )

        tvStatus.text = "Status: Salvando e Sincronizando..."
        
        // Use Coroutine to save to Room and trigger Worker manually for test
        CoroutineScope(Dispatchers.IO).launch {
            val database = com.example.whatsappcalllogger.data.AppDatabase.getDatabase(applicationContext)
            
            val entity = com.example.whatsappcalllogger.data.CallLogEntity(
                callPerson = testCall.callPerson,
                callDuration = testCall.callDuration,
                callType = testCall.callType.name,
                callStatus = testCall.callStatus.name,
                callTime = testCall.callTime,
                isSynced = false
            )
            
            database.callLogDao().insert(entity)
            
            val syncRequest = androidx.work.OneTimeWorkRequest.Builder(com.example.whatsappcalllogger.workers.SyncWorker::class.java).build()
            androidx.work.WorkManager.getInstance(applicationContext).enqueue(syncRequest)
            
            runOnUiThread {
                android.widget.Toast.makeText(this@MainActivity, "Salvo e agendado!", android.widget.Toast.LENGTH_SHORT).show()
                appendLog("[TESTE] Salvo no banco local e worker disparado.\n----------------\n")
                checkPermission()
                tvStatus.text = "Status: Sincronização Iniciada"
                tvStatus.setTextColor(resources.getColor(android.R.color.holo_green_dark, theme))
            }
        }
    }
}
