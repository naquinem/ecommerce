<?php

namespace App\Http\Controllers\Buyer;

use App\Models\Buyer\Order;
use Illuminate\Http\Request;
use App\Models\Buyer\CartItem;
use App\Models\Seller\Product;
use App\Models\Buyer\OrderItem;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $order = Order::where('id', Auth::id())->first();
        if(!$order) {
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ], 404);
        } else {
            return response()->json([
                'status' => 404,
                'order' => $order->items
            ], 404);
        }
    }
    public function store(Request $request)
    {
        $validated = $request->vallidate([
            'order_id' => 'required|integer',
            'product_id' => 'required|integer',
            'quantity' => 'required|integer',
            'price' => 'required|integer'
        ]);
        $order = Order::firstOrCreate([
            'user_id' => Auth::id()
        ]);
        $product = Product::where('id', $validated['product_id'])->first();
        $existingItem = OrderItem::where('order_id', $order->id)
                                ->where('product_id', $validated['product_id'])
                                ->first();
        if($existingItem) {
            $existingItem->quantity += $validated['quantity'];
            $existingItem->save();
            $product->quantity -= $validated['quantity'];
            $product->save();
            $cartItem = CartItem::where('product_id', $validated['product_id'])->first();
            $cartItem->delete();
            return response()->json([
                'status' => 200,
                'order_item' => $existingItem
            ], 200);
        } else {
            $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'price' => $product->price
            ]);
            if($orderItem){
                $product->quantity -= $validated['quantity'];
                $product->save();
                return response()->json([
                    'status' => 200,
                    'cart_item' => $orderItem,
                    'cart_item_product' => $orderItem->product
                ], 200);
            }
        }
    }
}
