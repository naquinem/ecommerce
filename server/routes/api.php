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
Route::get('read-products', [ProductController::class, 'index']);
Route::get('read-categories', [CategoryController::class, 'index']);

Route::middleware('auth:api')->group(function(){

    Route::post('add-category', [CategoryController::class, 'store']);
    Route::get('show-category/{id}', [CategoryController::class, 'show']);
    Route::put('update-category/{id}', [CategoryController::class, 'edit']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);

    Route::post('add-product', [ProductController::class, 'store']);
    Route::get('show-product/{id}', [ProductController::class, 'show']);
    Route::put('update-product/{id}', [ProductController::class, 'edit']);
    Route::delete('delete-product/{id}', [ProductController::class, 'destroy']);


    Route::get('seller/read-products', [ProductController::class, 'productIndex']);

    Route::get('read-carts', [CartController::class, 'cartIndex']);
    Route::post('add-cart-items', [CartController::class, 'store']);

    Route::post('read-order', [OrderController::class, 'index']);
    Route::post('checkout-order', [OrderController::class, 'store']);

    Route::post('logout', [AuthController::class, 'signout']);
});

