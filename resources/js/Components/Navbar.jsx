import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
    { href: '/',            label: 'Home' },
    { href: '/menu',        label: 'Menu' },
    { href: '/about',       label: 'About' },
    { href: '/gallery',     label: 'Gallery' },
    { href: '/reservations',label: 'Reservations' },
    { href: '/contact',     label: 'Contact' },
];

export default function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isHome = url === '/';
    const isDarkHeader = !scrolled && isHome;

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out
                    ${scrolled
                        ? 'bg-[#F9F8F6]/95 backdrop-blur-sm border-b border-[#1A1A1A]/10 py-4'
                        : 'bg-transparent py-7'
                    }`}
            >
                <nav className="max-w-[1600px] mx-auto px-8 lg:px-16 flex items-center justify-between">

                    {/* Logo / Wordmark */}
                    <Link
                        href="/"
                        className={`font-serif text-base tracking-[0.12em] uppercase font-normal transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1
                            ${isDarkHeader
                                ? 'text-[#F9F8F6] hover:text-[#D4AF37] focus-visible:ring-[#F9F8F6]'
                                : 'text-[#1A1A1A] hover:text-[#D4AF37] focus-visible:ring-[#1A1A1A]'
                            }`}
                        aria-label="L'Étoile Sauvage — Home"
                    >
                        L'Étoile <span className="italic">Sauvage</span>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-10" role="list">
                        {NAV_LINKS.map(({ href, label }) => {
                            const active = url === href || (href !== '/' && url.startsWith(href));
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-500 relative pb-0.5 focus-visible:outline-none
                                            after:absolute after:left-0 after:bottom-0 after:h-px after:bg-[#D4AF37] after:transition-all after:duration-500
                                            ${active
                                                ? (isDarkHeader ? 'text-[#F9F8F6] after:w-full' : 'text-[#1A1A1A] after:w-full')
                                                : (isDarkHeader ? 'text-[#F9F8F6]/60 hover:text-[#F9F8F6] after:w-0 hover:after:w-full' : 'text-[#6C6863] hover:text-[#1A1A1A] after:w-0 hover:after:w-full')
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Reserve CTA (desktop) */}
                    <Link
                        href="/reservations"
                        className={`hidden md:inline-flex items-center justify-center text-[10px] uppercase tracking-[0.25em] font-semibold h-10 px-6 transition-all duration-300
                            ${isDarkHeader
                                ? 'btn-gold'
                                : 'btn-dark'
                            }`}
                        aria-label="Reserve a table"
                    >
                        Reserve
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`md:hidden p-2 focus-visible:outline-none focus-visible:ring-1
                            ${isDarkHeader
                                ? 'text-[#F9F8F6] focus-visible:ring-[#F9F8F6]'
                                : 'text-[#1A1A1A] focus-visible:ring-[#1A1A1A]'
                            }`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-[#F9F8F6] flex flex-col pt-24 px-8 pb-12 md:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation"
                >
                    <ul className="flex flex-col gap-8 flex-1" role="list">
                        {NAV_LINKS.map(({ href, label }) => {
                            const active = url === href || (href !== '/' && url.startsWith(href));
                            return (
                                <li key={href} className="border-b border-[#1A1A1A]/10 pb-8">
                                    <Link
                                        href={href}
                                        onClick={() => setMenuOpen(false)}
                                        className={`font-serif text-4xl transition-colors duration-500
                                            ${active ? 'text-[#D4AF37]' : 'text-[#1A1A1A] hover:text-[#D4AF37]'}`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <Link
                        href="/reservations"
                        onClick={() => setMenuOpen(false)}
                        className="btn-dark w-full justify-center mt-8 text-[11px] h-12"
                    >
                        Reserve a Table
                    </Link>
                </div>
            )}
        </>
    );
}
