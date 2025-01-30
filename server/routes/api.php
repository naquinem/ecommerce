<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Buyer\CartController;
use App\Http\Controllers\Buyer\OrderController;
use App\Http\Controllers\Supplier\ProductController;
use App\Http\Controllers\Supplier\CategoryController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'signin']);

Route::middleware('auth:api')->group(function(){

    Route::post('add-category', [CategoryController::class, 'store']);
    Route::get('show-categories', [CategoryController::class, 'index']);
    Route::get('show-category', [CategoryController::class, 'show']);
    Route::put('update-category', [CategoryController::class, 'edit']);
    Route::delete('delete-category', [CategoryController::class, 'destroy']);

    Route::post('add-product', [ProductController::class, 'store']);
    Route::get('read-products', [ProductController::class, 'index']);
    Route::get('show-product', [ProductController::class, 'show']);
    Route::put('update-product', [ProductController::class, 'edit']);
    Route::delete('delete-product', [ProductController::class, 'destroy']);

    Route::get('read-carts', [CartController::class, 'cartIndex']);
    Route::post('add-cart-items', [CartController::class, 'store']);

    Route::post('read-order', [OrderController::class, 'index']);
    Route::post('checkout-order', [OrderController::class, 'store']);

    Route::post('logout', [AuthController::class, 'signout']);
});

