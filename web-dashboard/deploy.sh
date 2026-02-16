#!/bin/sh
set -e

echo "Starting deployment script..."

# Apply migrations
echo "Applying database migrations..."
if prisma migrate deploy; then
  echo "Migrations applied successfully."
else
  echo "Error applying migrations. Check your database connection and schema."
  # Non-blocking for now to allow server to start, or blocking? 
  # Let's make it blocking to force visibility of errors
  exit 1
fi

# Start server
echo "Starting Next.js server..."
node server.js
