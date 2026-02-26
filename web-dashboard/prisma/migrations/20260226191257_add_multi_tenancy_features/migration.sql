-- AlterTable
ALTER TABLE "Contact" ADD COLUMN "pushName" TEXT;

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "contactId" TEXT,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attachment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attachment_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fromMe" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "address" TEXT,
    "billingEmail" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'BRONZE',
    "maxInstances" INTEGER NOT NULL DEFAULT 3,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT,
    "name" TEXT,
    "lastSeen" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Device_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("createdAt", "id", "lastSeen", "name", "updatedAt") SELECT "createdAt", "id", "lastSeen", "name", "updatedAt" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE TABLE "new_EvolutionInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT,
    "name" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "apiKey" TEXT,
    "endpointUrl" TEXT,
    "webhookSecret" TEXT,
    "deviceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EvolutionInstance_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EvolutionInstance_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EvolutionInstance" ("apiKey", "createdAt", "deviceId", "endpointUrl", "id", "instanceId", "name", "phoneNumber", "updatedAt", "webhookSecret") SELECT "apiKey", "createdAt", "deviceId", "endpointUrl", "id", "instanceId", "name", "phoneNumber", "updatedAt", "webhookSecret" FROM "EvolutionInstance";
DROP TABLE "EvolutionInstance";
ALTER TABLE "new_EvolutionInstance" RENAME TO "EvolutionInstance";
CREATE UNIQUE INDEX "EvolutionInstance_instanceId_key" ON "EvolutionInstance"("instanceId");
CREATE UNIQUE INDEX "EvolutionInstance_deviceId_key" ON "EvolutionInstance"("deviceId");
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOVO',
    "value" REAL NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "contextSummary" TEXT,
    "toonContext" TEXT,
    "unprocessedMessages" INTEGER NOT NULL DEFAULT 0,
    "lastInteraction" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("contactId", "contextSummary", "createdAt", "id", "lastInteraction", "score", "status", "updatedAt", "value") SELECT "contactId", "contextSummary", "createdAt", "id", "lastInteraction", "score", "status", "updatedAt", "value" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE UNIQUE INDEX "Lead_contactId_key" ON "Lead"("contactId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
