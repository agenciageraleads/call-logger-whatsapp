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
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class MainActivity : AppCompatActivity() {

    private lateinit var btnPermission: Button
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
        tvStatus = findViewById(R.id.tvStatus)
        tvLogs = findViewById(R.id.tvLogs)

        btnPermission.setOnClickListener {
            startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS))
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
}
