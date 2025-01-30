<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Supplier\ProductController;
use App\Http\Controllers\Supplier\CategoryController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'signin']);
Route::middleware('auth:api')->group(function(){
    //categories
    Route::post('add-category', [CategoryController::class, 'store']);
    Route::get('show-categories', [CategoryController::class, 'index']);
    //products
    Route::post('add-product', [ProductController::class, 'store']);
    Route::get('read-products', [ProductController::class, 'index']);
    Route::get('show-product', [ProductController::class, 'show']);
    Route::put('update-product', [ProductController::class, 'edit']);
    Route::get('delete-product', [ProductController::class, 'destroy']);
    //Logout for Authenticated user
    Route::post('logout', [AuthController::class, 'signout']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
