<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/menu', [App\Http\Controllers\MenuController::class, 'index'])->name('menu.index');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->name('gallery');

Route::get('/reservations', function () {
    return Inertia::render('Reservations');
})->name('reservations.index');
Route::post('/reservations', [App\Http\Controllers\ReservationController::class, 'store'])->name('reservations.store');

Route::get('/order', [App\Http\Controllers\OrderController::class, 'index'])->name('order.index');
Route::post('/order', [App\Http\Controllers\OrderController::class, 'store'])->name('order.store');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact.index');
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

Route::post('/newsletter', [App\Http\Controllers\NewsletterController::class, 'store'])->name('newsletter.store');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
