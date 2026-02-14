-- CreateTable
CREATE TABLE "EvolutionInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "apiKey" TEXT,
    "endpointUrl" TEXT,
    "deviceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EvolutionInstance_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyMetric" (
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
    CONSTRAINT "DailyMetric_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "EvolutionInstance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionInstance_instanceId_key" ON "EvolutionInstance"("instanceId");

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionInstance_deviceId_key" ON "EvolutionInstance"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyMetric_date_instanceId_key" ON "DailyMetric"("date", "instanceId");

