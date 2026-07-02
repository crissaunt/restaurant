<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $query = Dish::query();

        // Filter by category
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Search by name or description
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'ilike', "%{$request->search}%")
                  ->orWhere('description', 'ilike', "%{$request->search}%");
            });
        }

        // Filter by dietary tag
        if ($request->filled('dietary')) {
            $tag = $request->dietary;
            $query->whereJsonContains('dietary_tags', $tag);
        }

        $dishes = $query->orderBy('category')->orderBy('name')->get();

        // Group by category for the menu view
        $grouped = $dishes->groupBy('category')->map(fn ($items) => $items->values());

        return Inertia::render('Menu', [
            'dishes' => $grouped,
            'filters' => [
                'category' => $request->category ?? 'all',
                'search'   => $request->search ?? '',
                'dietary'  => $request->dietary ?? '',
            ],
        ]);
    }
}
