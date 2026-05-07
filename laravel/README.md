## SETUP INSTALLATION

1. Install dependensi

```bash
composer install / composer update
```

2. copy .env file

```bash
cp .env.example .env
```

3. generate key application

```bash
php artisan key:generate
```

4. migrate database dan buat data sample menggunakan seeder

```bash
php artisan migrate --seed
```

5. run development server

```bash
php artisan serve
```

## CATATAN KHUSUS

1. Menggunakan custom response api agar format response apinya tetap konsisten.
2. Menggunakan api resource, agar jika suatu saat membutuhkan custome field yang perlu ditampilkan cukup dengan menambah fieldnya di api resource, tidak perlu mengubah controller dan route.
