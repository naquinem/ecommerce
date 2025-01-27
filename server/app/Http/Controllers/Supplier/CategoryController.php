<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        if($categories){
            return response()->json([
                'status' => 200,
                'categories' => $categories
            ],200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No categories found'
            ],404);
        }
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);
        if($validated){
            $categories = Category::create([
                'name' => $validated['name'],
                'description' => $validated['description']
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Successfully add category'
            ]);
        } else {
            return response()->json([
                "error" => "Bad Request",
                "message" => "Some required fields are missing. Please ensure all required information is provided."
            ],422);
        }

    }
}
