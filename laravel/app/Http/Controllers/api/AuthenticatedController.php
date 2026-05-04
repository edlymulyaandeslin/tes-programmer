<?php

namespace App\Http\Controllers\api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use function Pest\Laravel\json;

class AuthenticatedController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validators = Validator::make($request->all(), [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'confirm_password' => 'required|same:password',
            ]);

            if ($validators->fails()) {
                throw new \Exception($validators->errors());
            }

            $input = $request->only(['name', 'email', 'password']);
            $input['password'] = bcrypt($input['password']);

            $user = User::create($input);

            return new ApiResponse(true, 'User registered successfully', $user, 201);
        } catch (\Exception $e) {
            return new ApiResponse(false, 'User registration failed', $e->getMessage(), 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validators = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validators->fails()) {
                throw new \Exception($validators->errors());
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                throw new \Exception('Invalid email or password');
            }

            $user = User::where('email', $request->email)->first();

            $data = [
                'token' => $user->createToken('auth_token')->plainTextToken,
                'user' => $user
            ];

            return new ApiResponse(true, 'User logged in successfully', $data, 200);
        } catch (\Exception $e) {
            return new ApiResponse(false, 'User logged in failed', $e->getMessage(), 500);
        }
    }
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return new ApiResponse(true, 'User logged out successfully', null, 200);
        } catch (\Exception $e) {
            return new ApiResponse(false, 'User logged out failed', $e->getMessage(), 500);
        }
    }
}