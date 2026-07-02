import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { CalendarCheck, ShoppingBag, Mail, Users, TrendingUp } from 'lucide-react';

export default function Dashboard({
    stats,
    recentReservations,
    recentOrders,
    recentContacts,
    recentNewsletters,
}) {
    const statCards = [
        { name: 'Reservations', value: stats.reservations, icon: CalendarCheck, href: '/admin/reservations' },
        { name: 'Orders', value: stats.orders, icon: ShoppingBag, href: '/admin/orders' },
        { name: 'Contacts', value: stats.contacts, icon: Mail, href: '/admin/contacts' },
        { name: 'Newsletters', value: stats.newsletters, icon: Users, href: '/admin/newsletters' },
    ];

    return (
        <AdminLayout title="Dashboard">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                {statCards.map(card => (
                    <a
                        key={card.name}
                        href={card.href}
                        className="bg-white border border-[#1A1A1A]/10 p-6 hover:border-[#D4AF37]/50 transition-colors duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">{card.name}</p>
                            <card.icon size={18} className="text-[#D4AF37]" strokeWidth={1.5} />
                        </div>
                        <p className="font-serif text-3xl font-normal text-[#1A1A1A]">{card.value}</p>
                    </a>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-[#1A1A1A]/10">
                <div className="px-6 py-4 border-b border-[#1A1A1A]/10">
                    <h2 className="font-serif text-xl font-normal flex items-center gap-3">
                        <TrendingUp size={18} className="text-[#D4AF37]" strokeWidth={1.5} />
                        Recent Activity
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#1A1A1A]/10">
                                <th className="text-left px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium">Type</th>
                                <th className="text-left px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium">Name / Email</th>
                                <th className="text-left px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium">Details</th>
                                <th className="text-left px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentReservations.map(r => (
                                <tr key={`res-${r.id}`} className="border-b border-[#1A1A1A]/5 hover:bg-[#F9F8F6] transition-colors duration-300">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-2 text-[#D4AF37]">
                                            <CalendarCheck size={14} strokeWidth={1.5} />
                                            Reservation
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-[#1A1A1A]">{r.name}</p>
                                        <p className="text-xs text-[#6C6863]">{r.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[#6C6863]">{r.date} at {r.time} · {r.guests} guests</td>
                                    <td className="px-6 py-4 text-[#6C6863]">{new Date(r.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {recentOrders.map(o => (
                                <tr key={`ord-${o.id}`} className="border-b border-[#1A1A1A]/5 hover:bg-[#F9F8F6] transition-colors duration-300">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-2 text-[#D4AF37]">
                                            <ShoppingBag size={14} strokeWidth={1.5} />
                                            Order
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-[#1A1A1A]">{o.customer_name}</p>
                                        <p className="text-xs text-[#6C6863]">{o.customer_email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[#6C6863]">€{Number(o.total_price).toFixed(2)} · {o.status}</td>
                                    <td className="px-6 py-4 text-[#6C6863]">{new Date(o.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {recentContacts.map(c => (
                                <tr key={`con-${c.id}`} className="border-b border-[#1A1A1A]/5 hover:bg-[#F9F8F6] transition-colors duration-300">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-2 text-[#D4AF37]">
                                            <Mail size={14} strokeWidth={1.5} />
                                            Contact
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-[#1A1A1A]">{c.name}</p>
                                        <p className="text-xs text-[#6C6863]">{c.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[#6C6863] truncate max-w-xs">{c.message}</td>
                                    <td className="px-6 py-4 text-[#6C6863]">{new Date(c.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {recentNewsletters.map(n => (
                                <tr key={`news-${n.id}`} className="border-b border-[#1A1A1A]/5 hover:bg-[#F9F8F6] transition-colors duration-300">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-2 text-[#D4AF37]">
                                            <Users size={14} strokeWidth={1.5} />
                                            Newsletter
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-[#1A1A1A]">{n.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[#6C6863]">Subscribed</td>
                                    <td className="px-6 py-4 text-[#6C6863]">{new Date(n.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
