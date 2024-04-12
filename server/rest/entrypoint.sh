#!/bin/bash

# Attempt to fix the issue mentioned in the Dockerfile
docker-php-ext-install pdo pdo_mysql

if [ ! -f /app/migrations_completed ]; then
    php artisan migrate --force
    touch /app/migrations_completed
fi

if [ ! -f /app/seeders_completed ]; then
    php artisan db:seed --force
    touch /app/seeders_completed
fi

exec "$@"
