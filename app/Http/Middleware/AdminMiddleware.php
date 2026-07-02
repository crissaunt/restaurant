<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $adminEmail = env('ADMIN_EMAIL');

        if (!Auth::check() || Auth::user()->email !== $adminEmail) {
            abort(403, 'Unauthorized.');
        }

        return $next($request);
    }
}
