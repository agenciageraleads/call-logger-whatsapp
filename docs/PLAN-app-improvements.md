# PROJECT PLAN: WhatsappCallLogger Improvements (v1.0)
>
> **Goal:** Enhance reliability (offline mode), identity management (device naming), and analytics (charts/export).

---

## 🏗️ Phase 1: Identity & Control (Device Naming)

**Objective:** Allow users to rename devices (e.g., "Sales 01") for better tracking.

### 1.1 Database Schema Update

- [ ] Modify `schema.prisma`:
  - Ensure `Device` model has `name` (String, nullable) and `lastSeen` (DateTime).
  - Run migration: `npx prisma migrate dev --name device_naming`.

### 1.2 API Endpoint & Backend

- [ ] Update `POST /api/logs`:
  - Ensure `upsert` logic respects existing custom names (do not overwrite with "Device XYZ" if name exists).
- [ ] Create `PATCH /api/devices/[id]`:
  - Allow updating `name` field.

### 1.3 Frontend Implementation

- [ ] Update `page.tsx`:
  - Add "Edit" icon next to device name in the table.
  - Create a simple Modal or Inline Input for renaming.
  - Optimistic UI update (update list immediately).

---

## 🛡️ Phase 2: Bulletproof App (Offline Mode - Android)

**Objective:** Prevent data loss when internet fails. Store locally and sync later.

### 2.1 Android Dependencies

- [ ] Add `Room` (SQLite for Android) to `build.gradle`.
- [ ] Add `WorkManager` (Background Tasks) to `build.gradle`.

### 2.2 Local Database Implementation

- [ ] Create Entity `CallLogEntity`.
- [ ] Create DAO `CallLogDao` (insert, getAll, delete).
- [ ] Create Database `AppDatabase`.

### 2.3 Sync Logic (WorkManager)

- [ ] Create `SyncWorker`:
  - Reads pending logs from Room.
  - Sends to API (using existing `NetworkUtils`).
  - On success (200 OK): Deletes from Room.
  - On failure: Retries with exponential backoff.

### 2.4 Service Update

- [ ] Modify `AppNotificationService`:
  - **Step 1:** Save call to Room (Local DB).
  - **Step 2:** Trigger `OneTimeWorkRequest` to sync immediately.

---

## 📊 Phase 3: Data Intelligence (Analytics)

**Objective:** Visualize call volume and export data for reporting.

### 3.1 Visualizations (Charts)

- [ ] Install `recharts` (standard React charting library).
- [ ] Create `AnalyticsSection` component:
  - **Chart 1:** Calls per Hour (Bar Chart).
  - **Chart 2:** Status Distribution (Pie Chart: Missed vs Received).

### 3.2 Export Functionality

- [ ] Create `ExportButton` component:
  - Fetch all logs (or filtered view).
  - Convert JSON to CSV.
  - Trigger browser download (`whatsapp-logs-DATE.csv`).

---

## 📝 Verification Checklist

### Identity

- [ ] Can rename a device in dashboard?
- [ ] Does the new name persist after page reload?
- [ ] Does a new log from that device keep the custom name?

### Offline Mode

- [ ] **Test:** Turn off Wi-Fi on phone. Make a call.
- [ ] **Check:** App should not crash.
- [ ] **Test:** Turn Wi-Fi back on.
- [ ] **Check:** Log appears in dashboard automatically (sync).

### Analytics

- [ ] Do charts update when new logs arrive?
- [ ] Does CSV export contain all current data?
