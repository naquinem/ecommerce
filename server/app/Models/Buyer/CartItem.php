<?php

namespace App\Models\Buyer;

use App\Models\Seller\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CartItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'cart_id',
        'product_id',
        'quantity'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
