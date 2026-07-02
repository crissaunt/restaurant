<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $direction = $request->query('direction', 'desc');
        $perPage = 15;

        $query = Newsletter::query();

        if ($search) {
            $query->where('email', 'ilike', "%{$search}%");
        }

        $allowedSorts = ['email', 'created_at'];
        if (!in_array($sort, $allowedSorts)) {
            $sort = 'created_at';
        }
        $direction = $direction === 'asc' ? 'asc' : 'desc';

        $newsletters = $query->orderBy($sort, $direction)->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Newsletters', [
            'newsletters' => $newsletters,
            'filters' => [
                'search' => $search ?? '',
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function destroy(Newsletter $newsletter)
    {
        $newsletter->delete();

        return back()->with('success', 'Newsletter subscriber deleted successfully.');
    }
}
