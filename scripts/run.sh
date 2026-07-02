#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting deployment tasks..."

# Cache configuration for performance
echo "Caching Laravel configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

echo "Deployment tasks completed successfully."
