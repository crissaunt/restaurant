<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dish;

class DishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dishes = [
            // APPETIZERS
            [
                'name' => 'Heirloom Tomato & Foraged Moss',
                'description' => 'A structured composition of heirloom varieties, wild sorrel, and salted alabaster balsamic, finished with a delicate dusting of charcoal dust.',
                'price' => 24.00,
                'category' => 'appetizers',
                'dietary_tags' => ['vegetarian', 'vegan', 'gluten_free'],
                'image_url' => '/images/heirloom-tomato.jpg',
                'is_chefs_special' => false,
                'is_best_seller' => true,
            ],
            [
                'name' => 'Slow-Cooked Wild Chantarelles',
                'description' => 'Earthy wild mushrooms resting on a roasted hazelnut cream base, served alongside a toasted rye sourdough wafer and pickled elderberries.',
                'price' => 28.00,
                'category' => 'appetizers',
                'dietary_tags' => ['vegetarian'],
                'image_url' => '/images/wild-mushrooms.jpg',
                'is_chefs_special' => true,
                'is_best_seller' => false,
            ],
            [
                'name' => 'Wood-Fired Octopus & Sea Fennel',
                'description' => 'Charred tender octopus paired with a velvety smoked saffron emulsion, topped with crispy sea fennel and delicate ink coral tuile.',
                'price' => 32.00,
                'category' => 'appetizers',
                'dietary_tags' => ['gluten_free', 'spicy'],
                'image_url' => '/images/wood-fired-octopus.jpg',
                'is_chefs_special' => false,
                'is_best_seller' => false,
            ],

            // MAINS
            [
                'name' => 'Dry-Aged Venison Loin',
                'description' => 'Pan-seared forest venison loin served with a concentrated juniper berry reduction, butter-roasted salsify root, and wild forest bramble purée.',
                'price' => 58.00,
                'category' => 'mains',
                'dietary_tags' => ['gluten_free'],
                'image_url' => '/images/venison-loin.jpg',
                'is_chefs_special' => true,
                'is_best_seller' => true,
            ],
            [
                'name' => 'Pan-Seared Glacier Toothfish',
                'description' => 'Sustainable deep-sea toothfish set in a clean, hand-harvested sea vegetable broth, enhanced with verbena oil and crispy organic kelp.',
                'price' => 54.00,
                'category' => 'mains',
                'dietary_tags' => ['gluten_free'],
                'image_url' => '/images/glacier-toothfish.jpg',
                'is_chefs_special' => false,
                'is_best_seller' => false,
            ],
            [
                'name' => 'Foraged Winter Truffle Gnocchi',
                'description' => 'Light, hand-rolled potato gnocchi tossed in a luxurious aged hazelnut butter sauce, layered with generous shavings of black winter truffle.',
                'price' => 46.00,
                'category' => 'mains',
                'dietary_tags' => ['vegetarian'],
                'image_url' => '/images/truffle-gnocchi.jpg',
                'is_chefs_special' => false,
                'is_best_seller' => true,
            ],

            // DESSERTS
            [
                'name' => 'Smoked Pine Honey Parfait',
                'description' => 'A light, cold honey mousse paired with a rustic pollen crumble, finished with a few drops of spruce needle oil and caramelized honeycomb shards.',
                'price' => 19.00,
                'category' => 'desserts',
                'dietary_tags' => ['vegetarian', 'gluten_free'],
                'image_url' => '/images/honey-parfait.jpg',
                'is_chefs_special' => true,
                'is_best_seller' => false,
            ],
            [
                'name' => 'Dark Chocolate & Cep Mushroom Ganache',
                'description' => 'Rich, earthy 75% single-origin dark chocolate ganache, served with house-spun porcini mushroom ice cream and a pinch of Maldon salt flakes.',
                'price' => 22.00,
                'category' => 'desserts',
                'dietary_tags' => ['vegetarian'],
                'image_url' => '/images/chocolate-ganache.jpg',
                'is_chefs_special' => false,
                'is_best_seller' => true,
            ],

            // BEVERAGES
            [
                'name' => 'Spruce Needle & Elderflower Elixir',
                'description' => 'Cold-pressed spruce tips, wild elderflower syrup, and crisp, carbonated organic birch sap. A refreshing forest tribute.',
                'price' => 14.00,
                'category' => 'beverages',
                'dietary_tags' => ['vegetarian', 'vegan', 'gluten_free'],
                'image_url' => '/images/spruce-elixir.jpg',
                'is_chefs_special' => false,
                'is_best_seller' => true,
            ],
            [
                'name' => 'Smoked Pear & Sage Tonic',
                'description' => 'Velvety oak-smoked pear nectar blended with muddled fresh white sage and carbonated spring water.',
                'price' => 15.00,
                'category' => 'beverages',
                'dietary_tags' => ['vegetarian', 'vegan', 'gluten_free'],
                'image_url' => 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
                'is_chefs_special' => true,
                'is_best_seller' => false,
            ],
        ];

        foreach ($dishes as $dish) {
            Dish::create($dish);
        }
    }
}
