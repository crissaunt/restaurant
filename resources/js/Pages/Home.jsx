import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from './Layout';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';

const HERO_SLIDES = [
    { src: '/images/plated-venison.jpg', label: 'The Tasting Experience' },
    { src: '/images/venison-loin.jpg',   label: 'Seasonal Signatures'    },
    { src: '/images/chef-kitchen.jpg',   label: 'Wild Ingredients'       },
];

const FEATURED = [
    {
        name:     'Dry-Aged Venison Loin',
        category: 'Main Course',
        desc:     'Pan-seared forest venison with juniper berry reduction and butter-roasted salsify root.',
        img:      '/images/venison-loin.jpg',
        tag:      "Chef's Special",
    },
    {
        name:     'Wild Chantarelle Composition',
        category: 'Appetizer',
        desc:     'Earthy wild mushrooms on hazelnut cream with toasted rye wafer and pickled elderberries.',
        img:      '/images/wild-mushrooms.jpg',
        tag:      'Best Seller',
    },
    {
        name:     'Dark Chocolate & Cep Ganache',
        category: 'Dessert',
        desc:     '75% single-origin ganache with porcini mushroom ice cream and Maldon salt flakes.',
        img:      '/images/chocolate-ganache.jpg',
        tag:      'Best Seller',
    },
];

const TESTIMONIALS = [
    {
        quote:  'An experience that transcends dining. Each dish is a meditation on restraint, beauty, and the wild.',
        author: 'Elena Marchetti',
        role:   'Food Critic, La Cucina Italiana',
        avatar: '/images/avatar-elena.jpg',
        rating: 5,
    },
    {
        quote:  'The venison loin alone is worth the trip to Paris. The kitchen operates with quiet, absolute confidence.',
        author: 'James Whitmore',
        role:   'The Guardian — Dining',
        avatar: '/images/avatar-james.jpg',
        rating: 5,
    },
    {
        quote:  "Foraging as philosophy. L'Étoile Sauvage is the finest table in Paris — full stop.",
        author: 'Sophie Renard',
        role:   'Le Monde — Arts & Life',
        avatar: '/images/avatar-sophie.jpg',
        rating: 5,
    },
];

const STATS = [
    { value: '3',    label: 'Michelin Stars',    note: 'Awarded 2023'       },
    { value: '#1',   label: 'Paris Fine Dining', note: 'Condé Nast 2024'    },
    { value: '48',   label: 'Seat Dining Room',  note: 'Intimate & Private'  },
    { value: '100%', label: 'Locally Foraged',   note: 'Seasonal Menu'      },
];

export default function Home() {
    const [slide, setSlide]               = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [loaded, setLoaded]             = useState(false);

    useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setTransitioning(true);
            setTimeout(() => { setSlide(s => (s + 1) % HERO_SLIDES.length); setTransitioning(false); }, 800);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <Layout>
            <Head title="Home — Fine Dining" />

            {/* ══════════════════════════════════════════════════════
                HERO
                ══════════════════════════════════════════════════════ */}
            <section
                id="hero"
                className="relative min-h-screen flex items-end overflow-hidden"
                aria-label="Hero — L'Étoile Sauvage"
            >
                {/* ── Background slideshow ── */}
                <div className="absolute inset-0 z-0">
                    {HERO_SLIDES.map((s, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out
                                ${i === slide && !transitioning ? 'opacity-100' : 'opacity-0'}`}
                            aria-hidden={i !== slide}
                        >
                            <img
                                src={s.src}
                                alt={s.label}
                                className={`w-full h-full object-cover transition-transform duration-[18000ms] ease-linear
                                    ${i === slide && !transitioning ? 'scale-105' : 'scale-100'}`}
                            />
                        </div>
                    ))}

                    {/*
                        UX: Heavy gradient ensures ALL text + buttons are readable
                        regardless of which slide is showing.
                        Bottom: near-black for headings + buttons
                        Left: darker vignette for extra text legibility
                    */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                </div>

                {/* ── Slide indicators ── */}
                <div
                    className="absolute bottom-10 right-8 lg:right-16 flex items-center gap-2 z-20"
                    role="tablist"
                    aria-label="Hero slides"
                >
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={i === slide}
                            aria-label={`Slide ${i + 1}`}
                            onClick={() => setSlide(i)}
                            className={`transition-all duration-500 rounded-full
                                ${i === slide
                                    ? 'w-8 h-[3px] bg-[#D4AF37]'
                                    : 'w-3 h-[3px] bg-white/40 hover:bg-white/70'
                                }`}
                        />
                    ))}
                </div>

                {/* ── Hero content ── */}
                <div
                    className={`relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 pb-24 lg:pb-36 w-full
                        transition-all duration-[1100ms] ease-out
                        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />
                        <p className="eyebrow-light">Forage to Table — Paris</p>
                    </div>

                    {/* Headline — pure white for maximum contrast on dark overlay */}
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem]
                                   font-normal text-white leading-[0.9] max-w-3xl mb-8">
                        Where <span className="italic" style={{ color: '#D4AF37' }}>wild</span><br />
                        meets<br />
                        <span className="italic">refined</span>
                    </h1>

                    {/* Sub-copy — clearly readable with contrast */}
                    <p className="text-[#E8E3DC] text-[15px] leading-relaxed max-w-sm mb-12 font-light">
                        A tasting journey through nature's seasonal larder,<br />
                        prepared with obsessive care.
                    </p>

                    {/*
                        UX BUTTON DECISION:
                        • Primary CTA → btn-gold  (solid gold, dark text, 10:1 contrast — unmissable)
                        • Secondary CTA → btn-outline-white  (solid white border+text, 17:1 contrast)
                        Both are fully visible on any dark background.
                    */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/reservations" className="btn-gold">
                            Reserve a Table
                            <ArrowRight size={14} strokeWidth={2} />
                        </Link>
                        <Link href="/menu" className="btn-outline-white">
                            Explore the Menu
                        </Link>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2" aria-hidden="true">
                    <ChevronDown size={16} className="text-white/40 animate-bounce" strokeWidth={1.5} />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                ABOUT PREVIEW
                ══════════════════════════════════════════════════════ */}
            <section id="about-preview" className="py-28 lg:py-40" aria-labelledby="about-heading">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                        <div className="lg:col-span-5">
                            <p className="eyebrow mb-6">Our Story</p>
                            <h2
                                id="about-heading"
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] text-[#1A1A1A] mb-6"
                            >
                                The <span className="italic text-[#D4AF37]">art</span> of<br />
                                elemental cuisine
                            </h2>
                            <div className="w-10 h-px bg-[#D4AF37] mb-8" aria-hidden="true" />
                            <div className="text-[#4A4540] leading-relaxed text-[15px] space-y-4">
                                <p className="drop-cap">
                                    L'Étoile Sauvage was born from a conviction that the finest ingredients exist not in curated greenhouses, but in the living wilderness — in ancient forests, coastal shores, and highland meadows.
                                </p>
                                <p>
                                    Chef Aurélie Fontaine and her team forage alongside local botanists each season, composing menus that are never repeated and always unrepeatable.
                                </p>
                            </div>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-3 mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-400 group"
                            >
                                Read Our Full Story
                                <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-400" />
                            </Link>
                        </div>

                        <div className="lg:col-span-6 lg:col-start-7 relative">
                            {/* Decorative gold frame */}
                            <div
                                className="absolute -top-5 -right-5 w-full h-full border border-[#D4AF37]/25 hidden lg:block"
                                aria-hidden="true"
                            />
                            <div className="group relative aspect-[4/5] overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.15)] z-10">
                                <img
                                    src="/images/chef-kitchen.jpg"
                                    alt="Chef Aurélie Fontaine preparing a dish in the kitchen"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                                />
                                {/* Hover caption */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/75 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <p className="font-serif italic text-white text-xl mb-1">Chef Aurélie Fontaine</p>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Head Chef & Forager</p>
                                </div>
                            </div>
                            <div className="absolute -left-5 top-12 hidden lg:flex items-center gap-2 z-20" aria-hidden="true">
                                <div className="h-px w-5 bg-[#D4AF37]/60" />
                                <span className="vertical-label">Since 2019</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                FEATURED DISHES
                ══════════════════════════════════════════════════════ */}
            <section id="featured" className="py-28 lg:py-40 bg-[#F0EBE3]" aria-labelledby="featured-heading">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <div className="flex items-end justify-between mb-16 border-b border-[#1A1A1A]/10 pb-8">
                        <div>
                            <p className="eyebrow mb-4">Signature Dishes</p>
                            <h2
                                id="featured-heading"
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.05]"
                            >
                                The <span className="italic text-[#D4AF37]">season's</span><br />finest
                            </h2>
                        </div>
                        <Link
                            href="/menu"
                            className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C6863] hover:text-[#1A1A1A] transition-colors duration-300 group"
                        >
                            Full Menu
                            <ArrowRight size={13} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                        {FEATURED.map((dish, i) => (
                            <article key={dish.name} className="group">
                                <div className="relative aspect-[3/4] overflow-hidden mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-shadow duration-700">
                                    <img
                                        src={dish.img}
                                        alt={dish.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                                    />
                                    {/* Badge — solid gold, dark text, always legible */}
                                    <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5">
                                        {dish.tag}
                                    </div>
                                </div>
                                <div className="border-t-2 border-[#1A1A1A]/8 pt-5">
                                    <p className="eyebrow mb-2">{dish.category}</p>
                                    <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors duration-400 leading-snug">
                                        {dish.name}
                                    </h3>
                                    <p className="text-sm text-[#6C6863] leading-relaxed">{dish.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="flex justify-center mt-14 md:hidden">
                        <Link href="/menu" className="btn-dark">View Full Menu</Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                STATS
                ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#1A1A1A]" aria-label="Restaurant credentials">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-white/8">
                        {STATS.map(({ value, label, note }) => (
                            <div key={label} className="lg:px-12 first:pl-0 last:pr-0 group">
                                {/* Large number — white on dark = 17:1 contrast */}
                                <p className="font-serif text-4xl lg:text-5xl font-normal text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-500">
                                    {value}
                                </p>
                                <p className="text-[11px] font-medium text-[#EBE5DE]/70 uppercase tracking-[0.18em] mb-1">{label}</p>
                                <p className="text-[10px] text-[#6C6863] tracking-[0.1em]">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                TESTIMONIALS
                ══════════════════════════════════════════════════════ */}
            <section id="testimonials" className="py-28 lg:py-40" aria-labelledby="testimonials-heading">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <p className="eyebrow mb-4">Press & Patrons</p>
                            <h2
                                id="testimonials-heading"
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.05]"
                            >
                                What they <span className="italic text-[#D4AF37]">say</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 pb-1">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                                ))}
                            </div>
                            <span className="text-[11px] text-[#6C6863] uppercase tracking-[0.15em]">5.0 across 300+ reviews</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {TESTIMONIALS.map((t, i) => (
                            <blockquote
                                key={t.author}
                                className="group bg-white border border-[#1A1A1A]/8 p-8 hover:border-[#D4AF37]/40 hover:shadow-[0_8px_40px_rgba(212,175,55,0.08)] transition-all duration-500"
                            >
                                <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                                    {Array.from({ length: t.rating }).map((_, si) => (
                                        <Star key={si} size={11} className="fill-[#D4AF37] text-[#D4AF37]" />
                                    ))}
                                </div>

                                {/* Quote — dark text on white = max legibility */}
                                <p className="font-serif text-[1.1rem] italic leading-relaxed text-[#1A1A1A] mb-8">
                                    "{t.quote}"
                                </p>

                                <footer className="flex items-center gap-4 pt-5 border-t border-[#1A1A1A]/8">
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#D4AF37]/20 group-hover:ring-[#D4AF37]/60 transition-all duration-500">
                                        <img
                                            src={t.avatar}
                                            alt={t.author}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-400">
                                            {t.author}
                                        </p>
                                        <p className="text-[10px] text-[#6C6863] uppercase tracking-[0.14em] mt-0.5">{t.role}</p>
                                    </div>
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                CTA BANNER
                ══════════════════════════════════════════════════════ */}
            <section className="relative py-40 overflow-hidden" aria-label="Reservation call to action">
                <div className="absolute inset-0 z-0">
                    <img src="/images/plated-venison.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
                    {/* Dark overlay — strong enough that white text passes WCAG AA */}
                    <div className="absolute inset-0 bg-black/75" />
                </div>

                <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 text-center">
                    <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
                        <div className="h-px w-12 bg-[#D4AF37]/60" />
                        <p className="eyebrow-light">An Invitation</p>
                        <div className="h-px w-12 bg-[#D4AF37]/60" />
                    </div>
                    {/* Headline — white on near-black = 18:1 contrast */}
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.05] mb-6">
                        Reserve your <span className="italic" style={{ color: '#D4AF37' }}>evening</span>
                    </h2>
                    <p className="text-[#C8C2BB] text-[15px] leading-relaxed max-w-sm mx-auto mb-12 font-light">
                        Tables are limited. Bookings open 60 days in advance.<br />We look forward to welcoming you.
                    </p>
                    {/* Solid gold CTA — unmissable on any background */}
                    <Link href="/reservations" className="btn-gold">
                        Make a Reservation
                        <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
