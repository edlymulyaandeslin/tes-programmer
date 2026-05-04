<?php

use App\Http\Controllers\api\AuthenticatedController;
use App\Http\Controllers\api\PostController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthenticatedController::class, 'register']);
Route::post('/login', [AuthenticatedController::class, 'login']);
Route::post('/logout', [AuthenticatedController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('posts', PostController::class)->middleware('auth:sanctum');
