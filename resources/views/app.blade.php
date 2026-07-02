<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="L'Étoile Sauvage — A forage-to-table luxury dining experience celebrating the raw, elemental beauty of wild ingredients." />

        <!-- SEO Meta -->
        <meta name="keywords" content="luxury restaurant, fine dining, forage to table, tasting menu, reservations" />
        <meta property="og:title" content="L'Étoile Sauvage — Fine Dining" />
        <meta property="og:description" content="A forage-to-table luxury dining experience celebrating the raw, elemental beauty of wild ingredients." />
        <meta property="og:type" content="restaurant" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

        <title inertia>{{ config('app.name', "L'Étoile Sauvage") }}</title>

        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#F9F8F6] text-[#1A1A1A]">
        @inertia
    </body>
</html>
