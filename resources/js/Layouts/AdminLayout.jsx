import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    CalendarCheck,
    ShoppingBag,
    Mail,
    Users,
    LogOut,
    Menu,
    X,
    Search,
    Bell,
    ChevronDown,
} from 'lucide-react';

const NAV = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Reservations', href: '/admin/reservations', icon: CalendarCheck },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Contacts', href: '/admin/contacts', icon: Mail },
    { name: 'Newsletters', href: '/admin/newsletters', icon: Users },
];

export default function AdminLayout({ children, title }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;

    function handleLogout() {
        router.post('/logout');
    }

    const breadcrumbs = url.split('/').filter(Boolean);

    return (
        <div className="min-h-screen bg-[#F9F8F6]">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1A1A] text-[#F9F8F6] transform transition-transform duration-300 ease-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-white/10">
                        <Link href="/admin" className="font-serif text-lg tracking-wide">
                            L'Étoile <span className="italic">Sauvage</span>
                        </Link>
                        <button
                            className="ml-auto lg:hidden p-1"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {NAV.map(item => {
                            const active = url === item.href || url.startsWith(item.href + '/');
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-300 ${
                                        active
                                            ? 'text-[#D4AF37] bg-white/5'
                                            : 'text-[#EBE5DE]/70 hover:text-[#F9F8F6] hover:bg-white/5'
                                    }`}
                                >
                                    <Icon size={18} strokeWidth={1.5} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center text-sm font-medium">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user?.name}</p>
                                <p className="text-xs text-[#EBE5DE]/50 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 text-sm text-[#EBE5DE]/70 hover:text-[#F9F8F6] transition-colors duration-300"
                        >
                            <LogOut size={18} strokeWidth={1.5} />
                            Log out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top header */}
                <header className="sticky top-0 z-20 h-16 bg-[#F9F8F6]/95 backdrop-blur-sm border-b border-[#1A1A1A]/5 flex items-center px-4 lg:px-8">
                    <button
                        className="lg:hidden p-2 -ml-2 text-[#1A1A1A]"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={20} strokeWidth={1.5} />
                    </button>

                    <div className="flex-1 flex items-center justify-between">
                        <div className="hidden lg:flex items-center gap-2 text-sm text-[#6C6863]">
                            <span className="text-[10px] uppercase tracking-[0.2em]">Admin</span>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    <span className="text-[#D4AF37]/40">/</span>
                                    <span className={i === breadcrumbs.length - 1 ? 'text-[#1A1A1A] font-medium' : ''}>
                                        {crumb.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                            <div className="hidden md:flex items-center relative">
                                <Search size={16} className="absolute left-3 text-[#6C6863]" />
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="pl-9 pr-4 py-1.5 text-sm bg-transparent border border-[#1A1A1A]/10 rounded-none focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 w-64"
                                />
                            </div>
                            <button className="relative p-2 text-[#6C6863] hover:text-[#1A1A1A] transition-colors duration-300">
                                <Bell size={18} strokeWidth={1.5} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full" />
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 p-1.5 hover:bg-[#1A1A1A]/5 transition-colors duration-300"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center text-sm font-medium">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronDown size={14} className="hidden lg:block text-[#6C6863]" />
                                </button>
                                {profileOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setProfileOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#1A1A1A]/10 shadow-lg z-20">
                                            <div className="py-1">
                                                <Link
                                                    href="/"
                                                    className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F9F8F6]"
                                                    onClick={() => setProfileOpen(false)}
                                                >
                                                    View Site
                                                </Link>
                                                <button
                                                    onClick={() => { setProfileOpen(false); handleLogout(); }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F9F8F6]"
                                                >
                                                    Log out
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    {title && (
                        <h1 className="font-serif text-3xl font-normal mb-8">{title}</h1>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
