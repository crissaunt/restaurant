<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $dishes = Dish::orderBy('category')->orderBy('name')->get();
        $grouped = $dishes->groupBy('category')->map(fn ($items) => $items->values());

        return Inertia::render('Order', [
            'dishes' => $grouped,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name'    => 'required|string|max:255',
            'customer_email'   => 'required|email|max:255',
            'customer_phone'   => 'required|string|max:50',
            'delivery_address' => 'nullable|string|max:500',
            'items'            => 'required|array|min:1',
            'items.*.dish_id'  => 'required|exists:dishes,id',
            'items.*.name'     => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price'    => 'required|numeric|min:0',
            'total_price'      => 'required|numeric|min:0',
        ]);

        Order::create($validated);

        return back()->with('success', 'Your order has been placed! We will prepare it with care.');
    }
}
