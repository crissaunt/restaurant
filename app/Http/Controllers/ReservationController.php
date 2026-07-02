<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'email'  => 'required|email|max:255',
            'phone'  => 'required|string|max:50',
            'date'   => 'required|date|after_or_equal:today',
            'time'   => 'required|string',
            'guests' => 'required|integer|min:1|max:20',
            'notes'  => 'nullable|string|max:1000',
        ]);

        Reservation::create($validated);

        return back()->with('success', 'Your reservation has been received. We will confirm your booking shortly.');
    }
}
