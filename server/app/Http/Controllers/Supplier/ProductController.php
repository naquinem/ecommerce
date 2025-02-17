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
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'image_url' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'quantity' => 'required|integer|min:0',
        ]);

        // Upload the image
        $imagePath = $request->file('image_url')->store('images', 'public');

        // Get the authenticated user
        $user = User::where('id', Auth::id())->first();
        if (!$user) {
            // Return 401 Unauthorized if the user is not logged in
            return response()->json([
                'status' => 401,
                'errors' => 'Unauthorized',
                'message' => 'You must be logged in to create a product.',
            ], 401);
        } else {
            // Find the category
            $category = Category::find($validated['category_id']);
            // Create the product
            $product = Product::create([
                'user_id' => $user->id, // Use the authenticated user's ID
                'category_id' => $category->id,
                'image_url' => $imagePath,
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
            ], 200);
        }
    }
    public function productIndex()
    {
        $user = Product::where('user_id', Auth::id())->get();
        if(!$user){
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ], 404);
        } else {
            return response()->json([
                'status' => 200,
                'products' => $user
            ], 200);
        }
    }
    public function index()
    {
        $user = Product::where('user_id', Auth::id())->get();
        if(!$user){
            return response()->json([
                'status' => 404,
                'message' => 'Cart not found'
            ], 404);
        } else {
            $products = Product::all();
            return response()->json([
                'status' => 200,
                'products' => $products
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
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No product found'
            ], 404);
        }
    }
    public function edit(Request $request, $id)
    {
        // Validate the request
        $validated = $request->validate([
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
            // Find user authentication id
            $product = Product::find($id);
            if($product) {
                // Create the product
                $product->update([
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
                ], 200);
            }
        }
    }
    public function destroy($id)
    {
        //Check if the user is authenticated
        $user = Auth::check();
        if($user) {
            //Find the unique product id
            $product = Product::find($id);
            if($product) {
                $product->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Successfully deleted product'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No product found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to delete product.',
            ], 401);
        }
    }
}
