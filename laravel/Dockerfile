# Pakai komputer mini yang sudah ada PHP 8.3-nya
FROM php:8.3-cli

# Install alat-alat tambahan yang dibutuhkan Laravel buat nyambung ke database
RUN apt-get update && apt-get install -y \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql zip

# Install Composer (aplikasi buat download package PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Kita kerja di folder /var/www/html di dalam komputer mini ini
WORKDIR /var/www/html

# Perintah yang otomatis dijalankan pas komputer mini ini nyala
CMD php artisan serve --host=0.0.0.0 --port=8000
