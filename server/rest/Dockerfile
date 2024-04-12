FROM composer:latest

# This is meant to run at build time, but due to internet not working in docker during build? only for apk, not for composer etc.

#RUN echo -e "https://mirror.jingk.ai/alpine/v3.19/main\nhttps://mirror.jingk.ai/alpine/v3.19/community" > /etc/apk/repositories

#RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app

COPY . /app

RUN composer install

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
