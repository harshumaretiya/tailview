#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails
rm -f /rails/tmp/pids/server.pid

# Wait for database to be ready
echo "Waiting for database..."
until bundle exec rails runner "ActiveRecord::Base.connection.execute('SELECT 1')" >/dev/null 2>&1; do
  echo "Database is unavailable - sleeping"
  sleep 1
done

echo "Database is ready!"

# Run database migrations (only if needed)
if [ "$RAILS_ENV" = "production" ]; then
  echo "Running database migrations..."
  bundle exec rails db:migrate 2>/dev/null || bundle exec rails db:setup
fi

# Execute the main command
exec "$@"