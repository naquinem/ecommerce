<?php

namespace App\Http\Controllers\Buyer;

use App\Models\Buyer\Cart;
use Illuminate\Http\Request;
use App\Models\Buyer\CartItem;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function CartIndex()
    {
        $user = Auth::check();
        //Check if the user is authenticated
        if($user) {
            $cart = Cart::all();
            //Check if the cart have data
            if($cart) {
                return response()->json([
                    'status' => 200,
                    'cart' => $cart,
                    'cart_items' => $cart->items
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No cart found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to view all data in cart.',
            ], 401);
        }
    }
    public function index()
    {
        $user = Auth::check();
        //Check if the user is authenticated
        if($user) {
            $cart = CartItem::all();
            //Check if the cart items have data
            if($cart) {
                return response()->json([
                    'status' => 200,
                    'cart' => $cart
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No cart found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to view all data in cart.',
            ], 401);
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
            $user = User::where('id', Auth::id());
            if($user) {
                $cart = Cart::firstOrCreate([
                    'user_id' => Auth::id()
                ]);
                $product = Product::where('id', $validated['product_id'])->first();
                $existingItem = CartItem::where('cart_id', $cart->id)
                                ->where('product_id', $validated['product_id'])
                                ->exists();
                if($existingItem){
                    $existingItem->quantity += $validated['quantity'];
                    $existingItem->save();
                } else {
                    $cartItem = CartItem::create([
                        'cart_id' => $cart->id,
                        'product_id' => $product->id,
                        'quantity' => $validated['quantity']
                    ]);
                    return response()->json([
                        'status' => 200,
                        'products' => [
                            'cart_item' => $cartItem,
                            'details' => $cartItem->products
                        ]
                    ], 200);
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
