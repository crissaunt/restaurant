<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255|unique:newsletters,email',
        ]);

        Newsletter::create(['email' => $request->email]);

        return back()->with('success', 'You have been added to our mailing list. Expect seasonal updates and curated invitations.');
    }
}
