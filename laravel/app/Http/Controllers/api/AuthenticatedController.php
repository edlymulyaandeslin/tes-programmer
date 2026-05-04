<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'data' => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User registration failed',
                'data' => json_decode($e->getMessage()),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        // logic login
    }
    public function logout(Request $request)
    {
        // logic logout
    }
}
