<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $direction = $request->query('direction', 'desc');
        $perPage = 15;

        $query = Contact::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('email', 'ilike', "%{$search}%")
                  ->orWhere('message', 'ilike', "%{$search}%");
            });
        }

        $allowedSorts = ['name', 'email', 'created_at'];
        if (!in_array($sort, $allowedSorts)) {
            $sort = 'created_at';
        }
        $direction = $direction === 'asc' ? 'asc' : 'desc';

        $contacts = $query->orderBy($sort, $direction)->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Contacts', [
            'contacts' => $contacts,
            'filters' => [
                'search' => $search ?? '',
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return back()->with('success', 'Contact deleted successfully.');
    }
}
