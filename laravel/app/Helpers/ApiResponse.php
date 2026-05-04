<?php

namespace App\Helpers;

class ApiResponse
{
    public function __construct(private bool $success, private string $message, private mixed $data = null, private int $statusCode) {}

    public function toJson()
    {
        return response()->json([
            'success' => $this->success,
            'message' => $this->message,
            'data' => $this->data,
        ], $this->statusCode);
    }
}
