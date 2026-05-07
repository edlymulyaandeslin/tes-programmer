## Clone project

```bash
git clone [URL_REPOSITORY]
cd [project_name]
```

## SETUP INSTALLATION LARAVEL

1. Install dependensi

```bash
cd laravel
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

## SETUP INSTALLATION NEXTJS

1. Install dependensi

```bash
cd nextjs
npm install / yarn install
```

2. create a file .env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

3. run development server

```bash
npm run dev / yarn dev
```

## CATATAN KHUSUS

1. Menggunakan Cookie untuk menyimpan status login user
2. Membuat api service untuk menghandle semua request api ke backend
