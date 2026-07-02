<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Newsletter;
use App\Models\Order;
use App\Models\Reservation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'reservations' => Reservation::count(),
            'orders' => Order::count(),
            'contacts' => Contact::count(),
            'newsletters' => Newsletter::count(),
        ];

        $recentReservations = Reservation::latest()->take(5)->get(['id', 'name', 'email', 'date', 'time', 'guests', 'status', 'created_at']);
        $recentOrders = Order::latest()->take(5)->get(['id', 'customer_name', 'customer_email', 'total_price', 'status', 'created_at']);
        $recentContacts = Contact::latest()->take(5)->get(['id', 'name', 'email', 'created_at']);
        $recentNewsletters = Newsletter::latest()->take(5)->get(['id', 'email', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentReservations' => $recentReservations,
            'recentOrders' => $recentOrders,
            'recentContacts' => $recentContacts,
            'recentNewsletters' => $recentNewsletters,
        ]);
    }
}
