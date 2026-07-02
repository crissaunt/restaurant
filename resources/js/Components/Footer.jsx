import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const QUICK_LINKS = [
    { href: '/',             label: 'Home' },
    { href: '/menu',         label: 'Menu' },
    { href: '/about',        label: 'Our Story' },
    { href: '/gallery',      label: 'Gallery' },
    { href: '/reservations', label: 'Reservations' },
    { href: '/order',        label: 'Order Online' },
    { href: '/contact',      label: 'Contact' },
];

export default function Footer() {
    const { data, setData, post, processing, wasSuccessful, reset } = useForm({ email: '' });

    function handleNewsletter(e) {
        e.preventDefault();
        post('/newsletter', {
            onSuccess: () => reset(),
        });
    }

    return (
        <footer className="bg-[#1A1A1A] text-[#F9F8F6]">

            {/* Top strip */}
            <div className="border-b border-[#F9F8F6]/10">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Established 2019</p>
                        <h2 className="font-serif text-3xl font-normal mb-6 leading-tight">
                            L'Étoile <span className="italic">Sauvage</span>
                        </h2>
                        <p className="text-sm text-[#EBE5DE]/70 leading-relaxed max-w-xs">
                            A forage-to-table experience celebrating the raw, elemental beauty of wild ingredients and the art of restraint.
                        </p>
                        <div className="flex gap-4 mt-8">
                            {[
                                { href: '#', icon: Instagram, label: 'Instagram' },
                                { href: '#', icon: Facebook, label: 'Facebook' },
                                { href: '#', icon: Twitter,  label: 'X / Twitter' },
                            ].map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 border border-[#F9F8F6]/20 flex items-center justify-center text-[#6C6863] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                                >
                                    <Icon size={14} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-6">Navigate</p>
                        <ul className="flex flex-col gap-4" role="list">
                            {QUICK_LINKS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-[#EBE5DE]/70 hover:text-[#D4AF37] transition-colors duration-500"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Hours */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-6">Find Us</p>
                        <address className="not-italic flex flex-col gap-4 text-sm text-[#EBE5DE]/70 leading-relaxed">
                            <span>12 Rue de la Forêt<br />75008 Paris, France</span>
                            <a href="tel:+33140000000" className="hover:text-[#D4AF37] transition-colors duration-500">+33 1 40 00 00 00</a>
                            <a href="mailto:reservations@etoilesauvage.com" className="hover:text-[#D4AF37] transition-colors duration-500">reservations@etoilesauvage.com</a>
                        </address>
                        <div className="mt-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-3">Opening Hours</p>
                            <div className="text-sm text-[#EBE5DE]/70 flex flex-col gap-1">
                                <span>Tuesday – Saturday: 18:00 – 23:00</span>
                                <span>Sunday – Monday: Closed</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-6">Seasonal Updates</p>
                        <p className="text-sm text-[#EBE5DE]/70 leading-relaxed mb-8">
                            Subscribe for seasonal menus, exclusive events, and curated invitations.
                        </p>
                        {wasSuccessful ? (
                            <p className="text-sm text-[#D4AF37] font-serif italic">
                                You have been added to our list.
                            </p>
                        ) : (
                            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-0" noValidate>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="Your email address"
                                    aria-label="Email address for newsletter"
                                    required
                                    className="flex-1 bg-transparent border-b border-[#F9F8F6]/20 py-2.5 text-sm text-[#F9F8F6] placeholder:font-serif placeholder:italic placeholder:text-[#6C6863] focus:outline-none focus:border-[#D4AF37] transition-colors duration-700"
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    aria-label="Subscribe to newsletter"
                                    className="mt-4 sm:mt-0 sm:ml-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#F9F8F6] transition-colors duration-500 disabled:opacity-50 whitespace-nowrap focus-visible:outline-none focus-visible:underline"
                                >
                                    Subscribe <ArrowRight size={14} strokeWidth={1.5} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom strip */}
            <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-[#6C6863] tracking-[0.15em] uppercase">
                    © {new Date().getFullYear()} L'Étoile Sauvage. All rights reserved.
                </p>
                <div className="flex gap-6">
                    {['Privacy Policy', 'Terms of Service'].map(label => (
                        <a key={label} href="#" className="text-[10px] text-[#6C6863] tracking-[0.15em] uppercase hover:text-[#D4AF37] transition-colors duration-500">
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
