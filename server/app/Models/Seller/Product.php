<?php

namespace App\Models\Seller;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'description',
        'price',
        'quantity',
    ];

    // Define relationship with the Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function users()
    {
        return $this->belongsTo(Product::class);
    }
}
