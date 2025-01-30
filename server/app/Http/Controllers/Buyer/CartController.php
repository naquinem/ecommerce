<?php

namespace App\Http\Controllers\Buyer;

use App\Models\User;
use App\Models\Buyer\Cart;
use Illuminate\Http\Request;
use App\Models\Buyer\CartItem;
use App\Models\Seller\Product;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function cartIndex()
    {
        $cart = Cart::where('user_id', Auth::id())->first();
        if(!$cart){
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ], 404);
        } else {
            return response()->json([
                'status' => 200,
                'cart' => $cart->items
            ], 200);
        }
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|integer',
            'product_id' => 'required|integer',
            'quantity' => 'required|integer'
        ]);
        if($validated) {
            $user = User::where('id', Auth::id())->first();
            if($user) {
                $cart = Cart::firstOrCreate([
                    'user_id' => Auth::id()
                ]);
                $product = Product::where('id', $validated['product_id'])->first();
                $existingItem = CartItem::where('cart_id', $cart->id)
                                ->where('product_id', $validated['product_id'])
                                ->first();
                if($existingItem){
                    $existingItem->quantity += $validated['quantity'];
                    $existingItem->save();
                    //$product->quantity -= $validated['quantity'];
                    //    $product->save();
                    return response()->json([
                        'status' => 200,
                        'cart_item' => $existingItem
                    ], 200);
                } else {
                    $cartItem = CartItem::create([
                        'cart_id' => $cart->id,
                        'product_id' => $product->id,
                        'quantity' => $validated['quantity']
                    ]);
                    if($cartItem){
                        //$product->quantity -= $validated['quantity'];
                        //$product->save();
                        return response()->json([
                            'status' => 200,
                            'cart_item' => $cartItem,
                            'cart_item_product' => $cartItem->product
                        ], 200);
                    }
                }
            }
        } else {
            return response()->json([
                "error" => "Bad Request",
                "message" => "Some required fields are missing. Please ensure all required information is provided."
            ], 422);
        }
    }
}
