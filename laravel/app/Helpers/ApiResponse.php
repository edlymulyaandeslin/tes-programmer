<?php

namespace App\Helpers;

class ApiResponse
{
    static function toJson(bool $success, string $message, mixed $data = null, int $statusCode = 200)
    {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }
}
