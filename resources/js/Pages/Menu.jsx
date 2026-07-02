import { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import Layout from './Layout';
import { Search, X } from 'lucide-react';

const CATEGORIES = [
    { value: 'all',        label: 'All' },
    { value: 'appetizers', label: 'Appetizers' },
    { value: 'mains',      label: 'Main Course' },
    { value: 'desserts',   label: 'Desserts' },
    { value: 'beverages',  label: 'Beverages' },
];

const DIETARY_OPTIONS = [
    { value: 'vegetarian',  label: 'Vegetarian' },
    { value: 'vegan',       label: 'Vegan' },
    { value: 'gluten_free', label: 'Gluten-Free' },
    { value: 'spicy',       label: 'Spicy' },
];

const TAG_COLORS = {
    vegetarian:  'bg-[#EBE5DE] text-[#6C6863]',
    vegan:       'bg-[#EBE5DE] text-[#6C6863]',
    gluten_free: 'bg-[#EBE5DE] text-[#6C6863]',
    spicy:       'bg-[#1A1A1A] text-[#F9F8F6]',
};
const TAG_LABELS = { vegetarian: 'V', vegan: 'VG', gluten_free: 'GF', spicy: '🌶' };

function DishCard({ dish }) {
    return (
        <article className="group flex gap-6 border-b border-[#1A1A1A]/8 pb-8 hover:bg-[#F9F8F6] transition-colors duration-300">
            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] transition-shadow duration-700">
                <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-[1500ms] ease-out"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-serif text-lg font-normal group-hover:text-[#D4AF37] transition-colors duration-500">
                            {dish.name}
                        </h3>
                        {dish.is_chefs_special && (
                            <span className="text-[9px] uppercase tracking-[0.15em] bg-[#D4AF37] text-[#1A1A1A] px-2 py-0.5 whitespace-nowrap">
                                Chef's Special
                            </span>
                        )}
                        {dish.is_best_seller && (
                            <span className="text-[9px] uppercase tracking-[0.15em] border border-[#1A1A1A]/30 text-[#6C6863] px-2 py-0.5 whitespace-nowrap">
                                Best Seller
                            </span>
                        )}
                    </div>
                    <p className="font-serif text-xl font-normal text-[#1A1A1A] whitespace-nowrap">
                        €{Number(dish.price).toFixed(2)}
                    </p>
                </div>

                <p className="text-sm text-[#6C6863] leading-relaxed mb-3 line-clamp-2">
                    {dish.description}
                </p>

                {/* Dietary Tags */}
                {dish.dietary_tags?.length > 0 && (
                    <div className="flex gap-2 flex-wrap" aria-label="Dietary information">
                        {dish.dietary_tags.map(tag => (
                            <span
                                key={tag}
                                title={tag.replace('_', '-')}
                                className={`text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 ${TAG_COLORS[tag] || 'bg-[#EBE5DE] text-[#6C6863]'}`}
                            >
                                {TAG_LABELS[tag] || tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

export default function Menu({ dishes, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || 'all');
    const [dietary, setDietary] = useState(filters.dietary || '');

    // Client-side filter — server returns all dishes grouped, we filter client-side for instant UX
    const allDishes = useMemo(() => {
        return Object.values(dishes || {}).flat();
    }, [dishes]);

    const filtered = useMemo(() => {
        return allDishes.filter(d => {
            const matchCat = category === 'all' || d.category === category;
            const matchDiet = !dietary || (d.dietary_tags || []).includes(dietary);
            const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchDiet && matchSearch;
        });
    }, [allDishes, category, dietary, search]);

    const grouped = useMemo(() => {
        return filtered.reduce((acc, d) => {
            acc[d.category] = acc[d.category] || [];
            acc[d.category].push(d);
            return acc;
        }, {});
    }, [filtered]);

    const CAT_DISPLAY = {
        appetizers: 'Appetizers',
        mains:      'Main Course',
        desserts:   'Desserts',
        beverages:  'Beverages',
    };

    return (
        <Layout>
            <Head title="Menu" />

            {/* Page Header */}
            <div className="pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-[#1A1A1A]/10">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">The Seasonal Menu</p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95] mb-8">
                        Our <span className="italic text-[#D4AF37]">Carte</span>
                    </h1>
                    <p className="text-base text-[#6C6863] leading-relaxed max-w-md">
                        Each dish is conceived around what the land yields that week. All prices are per serving and exclusive of service.
                    </p>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* ── Filters Sidebar ─────────────────────── */}
                    <aside className="lg:col-span-3" aria-label="Menu filters">
                        {/* Search */}
                        <div className="relative mb-10">
                            <Search size={14} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#6C6863]" aria-hidden="true" />
                            <input
                                type="search"
                                id="menu-search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search dishes…"
                                aria-label="Search menu dishes"
                                className="input-underline pl-6"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    aria-label="Clear search"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6C6863] hover:text-[#1A1A1A] transition-colors duration-300"
                                >
                                    <X size={14} strokeWidth={1.5} />
                                </button>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mb-10">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-5">Category</p>
                            <div className="flex flex-col gap-1" role="radiogroup" aria-label="Filter by category">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.value}
                                        role="radio"
                                        aria-checked={category === cat.value}
                                        onClick={() => setCategory(cat.value)}
                                        className={`text-left text-sm py-2 border-l-2 pl-4 transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]
                                            ${category === cat.value
                                                ? 'border-[#D4AF37] text-[#1A1A1A] font-medium'
                                                : 'border-transparent text-[#6C6863] hover:border-[#1A1A1A]/20 hover:text-[#1A1A1A]'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dietary */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-5">Dietary</p>
                            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by dietary preference">
                                {DIETARY_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setDietary(dietary === opt.value ? '' : opt.value)}
                                        aria-pressed={dietary === opt.value}
                                        className={`text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]
                                            ${dietary === opt.value
                                                ? 'border-[#D4AF37] bg-[#D4AF37] text-[#1A1A1A]'
                                                : 'border-[#1A1A1A]/20 text-[#6C6863] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                                {dietary && (
                                    <button
                                        onClick={() => setDietary('')}
                                        className="text-[10px] text-[#6C6863] hover:text-[#1A1A1A] underline transition-colors duration-300"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* ── Menu Items ──────────────────────────── */}
                    <div className="lg:col-span-9">
                        {filtered.length === 0 ? (
                            <div className="text-center py-24">
                                <p className="font-serif text-2xl text-[#6C6863] italic">No dishes match your selection.</p>
                                <button
                                    onClick={() => { setSearch(''); setCategory('all'); setDietary(''); }}
                                    className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-500 underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            Object.entries(grouped).map(([cat, items]) => (
                                <section key={cat} className="mb-16" aria-labelledby={`cat-${cat}`}>
                                    <div className="flex items-center gap-6 mb-8">
                                        <h2 id={`cat-${cat}`} className="font-serif text-3xl font-normal">
                                            {CAT_DISPLAY[cat] || cat}
                                        </h2>
                                        <div className="flex-1 h-px bg-[#1A1A1A]/8" aria-hidden="true" />
                                        <span className="text-[10px] text-[#6C6863] uppercase tracking-[0.2em]">{items.length} items</span>
                                    </div>
                                    <div className="flex flex-col gap-8">
                                        {items.map(dish => (
                                            <DishCard key={dish.id} dish={dish} />
                                        ))}
                                    </div>
                                </section>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
