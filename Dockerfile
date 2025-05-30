# ./Dockerfile
FROM php:8.3-apache
COPY ./www /var/www/html
EXPOSE 80