<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $direction = $request->query('direction', 'desc');
        $perPage = 15;

        $query = Reservation::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('email', 'ilike', "%{$search}%")
                  ->orWhere('phone', 'ilike', "%{$search}%");
            });
        }

        $allowedSorts = ['name', 'email', 'date', 'time', 'guests', 'status', 'created_at'];
        if (!in_array($sort, $allowedSorts)) {
            $sort = 'created_at';
        }
        $direction = $direction === 'asc' ? 'asc' : 'desc';

        $reservations = $query->orderBy($sort, $direction)->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Reservations', [
            'reservations' => $reservations,
            'filters' => [
                'search' => $search ?? '',
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return back()->with('success', 'Reservation deleted successfully.');
    }
}
