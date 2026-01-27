#!/bin/sh
# Apply migrations
npx prisma migrate deploy

# Start server
node server.js
