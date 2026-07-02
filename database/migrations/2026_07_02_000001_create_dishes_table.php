<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->string('category'); // e.g., 'appetizers', 'mains', 'desserts', 'beverages'
            $table->json('dietary_tags')->nullable(); // e.g., ['vegetarian', 'vegan', 'gluten_free', 'spicy']
            $table->string('image_url')->nullable();
            $table->boolean('is_chefs_special')->default(false);
            $table->boolean('is_best_seller')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dishes');
    }
};
