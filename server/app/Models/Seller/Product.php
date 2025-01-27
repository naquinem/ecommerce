<?php

namespace App\Models\Seller;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'quantity',
        'image_url'
    ];

    // Define relationship with the Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
