<?php

use App\Http\Controllers\api\AuthenticatedController;
use App\Http\Controllers\api\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/register', [AuthenticatedController::class, 'register']);
Route::get('/login', [AuthenticatedController::class, 'login']);
Route::get('/logout', [AuthenticatedController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('posts', PostController::class)->middleware('auth:sanctum');
