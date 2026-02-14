-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "jid" TEXT NOT NULL,
    "firstSeen" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contact_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "EvolutionInstance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyConversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "instanceId" TEXT NOT NULL,
    "jid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DailyConversation_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "EvolutionInstance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProcessedMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "jid" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProcessedMessage_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "EvolutionInstance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_instanceId_jid_key" ON "Contact"("instanceId", "jid");

-- CreateIndex
CREATE UNIQUE INDEX "DailyConversation_date_instanceId_jid_key" ON "DailyConversation"("date", "instanceId", "jid");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedMessage_instanceId_messageId_key" ON "ProcessedMessage"("instanceId", "messageId");
