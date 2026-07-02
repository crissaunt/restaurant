import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Search, ArrowUpDown, Trash2 } from 'lucide-react';

function SortableHeader({ label, sort, direction, currentSort, currentDirection, onSort }) {
    return (
        <th className="text-left px-6 py-3">
            <button
                onClick={() => onSort(sort)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium hover:text-[#1A1A1A] transition-colors duration-300"
            >
                {label}
                {currentSort === sort && (
                    <ArrowUpDown size={12} className={currentDirection === 'asc' ? 'rotate-180' : ''} />
                )}
            </button>
        </th>
    );
}

export default function Orders({ orders, filters }) {
    function handleSort(sort) {
        const direction = filters.sort === sort && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/admin/orders', { ...filters, sort, direction }, { preserveState: true });
    }

    function handleSearch(e) {
        router.get('/admin/orders', { search: e.target.value }, { preserveState: true });
    }

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(`/admin/orders/${id}`);
        }
    }

    return (
        <AdminLayout title="Orders">
            <div className="bg-white border border-[#1A1A1A]/10">
                <div className="px-6 py-4 border-b border-[#1A1A1A]/10 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C6863]" />
                        <input
                            type="search"
                            value={filters.search}
                            onChange={handleSearch}
                            placeholder="Search orders..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-transparent border border-[#1A1A1A]/10 focus:outline-none focus:border-[#D4AF37] transition-colors duration-300"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#1A1A1A]/10">
                                <SortableHeader label="Customer" sort="customer_name" currentSort={filters.sort} currentDirection={filters.direction} onSort={handleSort} />
                                <SortableHeader label="Email" sort="customer_email" currentSort={filters.sort} currentDirection={filters.direction} onSort={handleSort} />
                                <th className="text-left px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium">Phone</th>
                                <th className="text-left px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium">Total</th>
                                <SortableHeader label="Status" sort="status" currentSort={filters.sort} currentDirection={filters.direction} onSort={handleSort} />
                                <SortableHeader label="Date" sort="created_at" currentSort={filters.sort} currentDirection={filters.direction} onSort={handleSort} />
                                <th className="text-left px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-[#6C6863] font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map(o => (
                                <tr key={o.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F9F8F6] transition-colors duration-300">
                                    <td className="px-6 py-4 font-medium text-[#1A1A1A]">{o.customer_name}</td>
                                    <td className="px-6 py-4 text-[#6C6863]">{o.customer_email}</td>
                                    <td className="px-6 py-4 text-[#6C6863]">{o.customer_phone}</td>
                                    <td className="px-6 py-4 text-[#1A1A1A] font-serif">€{Number(o.total_price).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-wider ${
                                            o.status === 'completed' ? 'bg-[#D4AF37]/10 text-[#1A1A1A]' :
                                            o.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                                            o.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                                            'bg-[#EBE5DE] text-[#6C6863]'
                                        }`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#6C6863]">{new Date(o.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(o.id)}
                                            className="p-2 text-[#6C6863] hover:text-red-600 transition-colors duration-300"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} strokeWidth={1.5} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {orders.data.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-[#6C6863]">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {orders.links && orders.links.length > 3 && (
                    <div className="px-6 py-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                        <p className="text-sm text-[#6C6863]">
                            Showing {orders.from} to {orders.to} of {orders.total} results
                        </p>
                        <div className="flex gap-2">
                            {orders.links.map((link, i) => (
                                <button
                                    key={i}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-1.5 text-sm border transition-colors duration-300 ${
                                        link.active
                                            ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A]'
                                            : link.url
                                                ? 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#D4AF37]'
                                                : 'bg-[#F9F8F6] text-[#6C6863] border-[#1A1A1A]/5 cursor-not-allowed'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
