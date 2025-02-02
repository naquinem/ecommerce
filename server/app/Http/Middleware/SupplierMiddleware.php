<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SupplierMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check()){
            if(auth()->user()->roles === 'supplier') {
                return $next($request);
            } else {
                return response()->json([
                    'status' => 403,
                    'error' => 'InsufficientPermissions',
                    'message' => 'Accessing this page requires a supplier role.'
                ], 403);
            }
        } else {
            return response()->json([
                'status' => 401,
                'error' => 'Unauthenticated',
                'message' => 'Please login your account'
            ], 401);
        }
    }
}
