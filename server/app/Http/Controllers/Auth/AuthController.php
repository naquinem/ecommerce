<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(4)
            ]
        ]);
        if($validated){
            $user = User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password'])
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Successfully Registered'
            ],200);
        } else {
            return response()->json([
                "error" => "Bad Request",
                "message" => "Some required fields are missing. Please ensure all required information is provided."
            ],422);
        }
    }
    public function signin(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string'
        ]);
        if($validated){
            $user = User::where('email', $validated['email'])->first();
            if(!$user || !Hash::check($validated['password'], $user->password)){
                return response()->json([
                    "error" => "Unauthenticated",
                    "message" => "Email or password is incorrect"
                ], 401);
            } else {
                $token = $user->createToken($user->username.'_token')->accessToken;
                return response()->json([
                    'status' => 200,
                    'message' => 'Successfully login',
                    'user' => $user->username,
                    'token' => $token
                ], 200);
            }
        } else {
            return response()->json([
                "error" => "Bad Request",
                "message" => "Some required fields are missing. Please ensure all required information is provided."
            ],400);
        }
    }
    public function signout()
    {
        if(Auth::check()){
            auth()->user()->token()->revoke();
            return response()->json([
                'status' => 200,
                'message' => 'Successfully signout'
            ],200);
        }
    }
}
