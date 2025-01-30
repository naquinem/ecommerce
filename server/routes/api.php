<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Supplier\ProductController;
use App\Http\Controllers\Supplier\CategoryController;

//User registration
Route::post('register', [AuthController::class, 'register']);
//User sign-up
Route::post('login', [AuthController::class, 'signin']);
//Only authenticated users will access this routes
Route::middleware('auth:api')->group(function(){
    //categories CRUD
    Route::post('add-category', [CategoryController::class, 'store']);
    Route::get('show-categories', [CategoryController::class, 'index']);
    Route::get('show-category', [CategoryController::class, 'show']);
    Route::put('update-category', [CategoryController::class, 'edit']);
    Route::delete('delete-category', [CategoryController::class, 'destroy']);
    //products CRUD
    Route::post('add-product', [ProductController::class, 'store']);
    Route::get('read-products', [ProductController::class, 'index']);
    Route::get('show-product', [ProductController::class, 'show']);
    Route::put('update-product', [ProductController::class, 'edit']);
    Route::delete('delete-product', [ProductController::class, 'destroy']);
    //Logout for Authenticated user
    Route::post('logout', [AuthController::class, 'signout']);
});

