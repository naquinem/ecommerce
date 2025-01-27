<?php

namespace App\Http\Controllers\Supplier;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Seller\Product;
use App\Models\Seller\Category;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::where('user_id', Auth::id())->get();
        if(!$product){
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ], 404);
        } else {
            return response()->json([
                'status' => 200,
                'data' => $product
            ], 200);
        }
    }
    public function show($id)
    {
        $product = Product::find($id);
        if($product){
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
        // Validate the request
        $validated = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'quantity' => 'required|integer|min:0',
        ]);

        // Get the authenticated user
        $user = User::where('id', Auth::user()->id)->first();

        if (!$user) {
            // Return 401 Unauthorized if the user is not logged in
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to create a product.',
            ], 401);
        } else {
            // Find the category
            $category = Category::find($validated['category_id']);

            // Create the product
            $product = Product::create([
                'user_id' => $user->id, // Use the authenticated user's ID
                'category_id' => $category->id,
                'name' => $validated['name'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'quantity' => $validated['quantity'],
            ]);

            // Return a success response with the created product
            return response()->json([
                'status' => 200,
                'message' => 'Product created successfully.',
                'product' => $product,
            ]);
            }


    }
}
