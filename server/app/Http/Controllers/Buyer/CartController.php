<?php

namespace App\Http\Controllers\Buyer;

use App\Models\Buyer\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::check();
        //Check if the user is authenticated
        if($user) {
            $cart = Cart::all();

        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to view all data in cart.',
            ], 401);
        }
    }
}
