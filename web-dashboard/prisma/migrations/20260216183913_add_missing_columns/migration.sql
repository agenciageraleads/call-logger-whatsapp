-- AlterTable
ALTER TABLE "EvolutionInstance" ADD COLUMN "phoneNumber" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "instanceId" TEXT NOT NULL,
    "activeConversations" INTEGER NOT NULL DEFAULT 0,
    "newContacts" INTEGER NOT NULL DEFAULT 0,
    "messagesSent" INTEGER NOT NULL DEFAULT 0,
    "messagesReceived" INTEGER NOT NULL DEFAULT 0,
    "callsMade" INTEGER NOT NULL DEFAULT 0,
    "callsReceived" INTEGER NOT NULL DEFAULT 0,
    "callDuration" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyMetric_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "EvolutionInstance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DailyMetric" ("activeConversations", "callDuration", "callsMade", "callsReceived", "createdAt", "date", "id", "instanceId", "messagesReceived", "messagesSent", "newContacts", "updatedAt") SELECT "activeConversations", "callDuration", "callsMade", "callsReceived", "createdAt", "date", "id", "instanceId", "messagesReceived", "messagesSent", "newContacts", "updatedAt" FROM "DailyMetric";
DROP TABLE "DailyMetric";
ALTER TABLE "new_DailyMetric" RENAME TO "DailyMetric";
CREATE UNIQUE INDEX "DailyMetric_date_instanceId_key" ON "DailyMetric"("date", "instanceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
