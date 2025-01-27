<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::all();
        if($product->count() > 0){
            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'product' => 'No product found'
            ]);
        }
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'category_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
        ]);
        $user = User::where('id', auth()->user()->id)->first();
        if($user){
            if($validated){
                $product = Product::create([
                    'user_id' => $user->id,
                    'category_id' => $validated['category_id'],
                    'name' => $validated['name'],
                    'description' => $validated['description'],
                    'price' => $validated['price'],
                    'quantity' => $validated['quantity'],
                ]);
                return response()->json([
                    'status' => 200,
                    'product' => $product
                ]);
            } else {
                return response()->json([
                    'status' => 422,
                    'message' => 'Please input all the required fields'
                ]);
            }
        } else {
            return response()->json([
                'status' => 422,
                'error' => 'Access denied',
                'message' => 'You do not have permission to perform this action. Please login to your admin account'
            ]);
        }
    }
}
