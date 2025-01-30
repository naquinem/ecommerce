<?php

namespace App\Http\Controllers\Supplier;

use Illuminate\Http\Request;
use App\Models\Seller\Category;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        //Validate input fields in frontend
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);
        //Check if validated data
        if($validated){
            $user = Auth::check();
            //Check if the user is authenticated
            if($user) {
                $category = Category::create([
                    'name' => $validated['name'],
                    'description' => $validated['description']
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Successfully add category'
                ], 200);
            } else {
                return response()->json([
                    'status' => 401,
                    'error' => 'Unauthorized',
                    'message' => 'You must be logged in to create category.',
                ], 401);
            }
        } else {
            return response()->json([
                "error" => "Bad Request",
                "message" => "Some required fields are missing. Please ensure all required information is provided."
            ], 422);
        }
    }
    public function index()
    {
        $user = Auth::check();
        if($user) {
            //View all categories
            $categories = Category::all();
            if($categories){
                return response()->json([
                    'status' => 200,
                    'categories' => $categories
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No categories found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to view all categories.',
            ], 401);
        }
    }
    public function show($id)
    {
        $user = Auth::check();
        if($user) {
            $category = Category::find($id);
            if($category) {
                return response()->json([
                    'status' => 200,
                    'category' => $category
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No category found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to view category.',
            ], 401);
        }
    }
    public function edit(Request $request, $id)
    {
        //Validate input fields in frontend
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);
        //Check if validated data
        if($validated){
            $user = Auth::check();
            //Check if the user is authenticated
            if($user) {
                //Find if there's an id found in category table to edit the specific category
                $category = Category::find($id);
                if($category) {
                    //Update the category once id is found in category table
                    $category->update([
                        'name' => $validated['name'],
                        'description' => $validated['description']
                    ]);
                    return response()->json([
                        'status' => 200,
                        'message' => 'Successfully updated category'
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'No category found'
                    ], 404);
                }
            } else {
                return response()->json([
                    'status' => 401,
                    'error' => 'Unauthorized',
                    'message' => 'You must be logged in to update category.',
                ], 401);
            }
        } else {
            return response()->json([
                "error" => "Bad Request",
                "message" => "Some required fields are missing. Please ensure all required information is provided."
            ], 422);
        }
    }
    public function destroy($id)
    {
        $user = Auth::check();
        if($user) {
            $category = Category::find($id);
            if($category) {
                $category->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Successfully deleted category'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No category found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'You must be logged in to delete category.',
            ], 401);
        }
    }
}
