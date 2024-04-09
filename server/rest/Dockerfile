FROM composer:latest

#RUN apt-get update -y && apt-get install -y it 7zip zip

# RUN docker-php-ext-install pdo mbstring

WORKDIR /app
COPY . /app

RUN composer install

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
