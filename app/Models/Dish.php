<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'dietary_tags',
        'image_url',
        'is_chefs_special',
        'is_best_seller',
    ];

    protected $casts = [
        'dietary_tags' => 'array',
        'is_chefs_special' => 'boolean',
        'is_best_seller' => 'boolean',
        'price' => 'decimal:2',
    ];

    /**
     * Scope a query to only include dishes of a given category.
     */
    public function scopeOfCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
