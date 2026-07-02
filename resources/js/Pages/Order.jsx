import { useState, useMemo } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import Layout from './Layout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { ShoppingBag, Plus, Minus, X, CheckCircle } from 'lucide-react';

const CAT_LABELS = {
    appetizers: 'Appetizers',
    mains:      'Main Course',
    desserts:   'Desserts',
    beverages:  'Beverages',
};

function CartItem({ item, onRemove, onQty }) {
    return (
        <li className="flex items-center gap-4 py-4 border-b border-[#1A1A1A]/8 last:border-0">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-[10px] text-[#6C6863] uppercase tracking-[0.1em]">€{Number(item.price).toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => onQty(item, -1)} className="w-6 h-6 flex items-center justify-center border border-[#1A1A1A]/20 text-[#6C6863] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]" aria-label={`Decrease quantity of ${item.name}`}>
                    <Minus size={10} strokeWidth={1.5} />
                </button>
                <span className="w-5 text-center text-sm" aria-live="polite">{item.quantity}</span>
                <button onClick={() => onQty(item, 1)} className="w-6 h-6 flex items-center justify-center border border-[#1A1A1A]/20 text-[#6C6863] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]" aria-label={`Increase quantity of ${item.name}`}>
                    <Plus size={10} strokeWidth={1.5} />
                </button>
            </div>
            <p className="text-sm w-14 text-right font-serif">€{(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => onRemove(item)} className="text-[#6C6863] hover:text-[#1A1A1A] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]" aria-label={`Remove ${item.name} from cart`}>
                <X size={14} strokeWidth={1.5} />
            </button>
        </li>
    );
}

export default function Order({ dishes }) {
    const { flash } = usePage().props;
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkout, setCheckout] = useState(false);

    const allDishes = useMemo(() => Object.values(dishes || {}).flat(), [dishes]);

    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

    function addToCart(dish) {
        setCart(prev => {
            const existing = prev.find(i => i.dish_id === dish.id);
            if (existing) return prev.map(i => i.dish_id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { dish_id: dish.id, name: dish.name, price: Number(dish.price), quantity: 1 }];
        });
        setCartOpen(true);
    }

    function updateQty(item, delta) {
        setCart(prev => prev.map(i => i.dish_id === item.dish_id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
    }

    function removeItem(item) {
        setCart(prev => prev.filter(i => i.dish_id !== item.dish_id));
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_name:    '',
        customer_email:   '',
        customer_phone:   '',
        delivery_address: '',
        items:            [],
        total_price:      0,
    });

    function handleCheckout(e) {
        e.preventDefault();
        router.post('/order', { ...data, items: cart, total_price: total }, {
            onSuccess: () => { reset(); setCart([]); setCheckout(false); },
        });
    }

    const grouped = useMemo(() => {
        return allDishes.reduce((acc, d) => {
            acc[d.category] = acc[d.category] || [];
            acc[d.category].push(d);
            return acc;
        }, {});
    }, [allDishes]);

    return (
        <Layout>
            <Head title="Order Online" />

            {/* Header */}
            <div className="pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-[#1A1A1A]/10">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16 flex items-end justify-between gap-8">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Delivery & Collection</p>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95]">
                            Order <span className="italic text-[#D4AF37]">Online</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setCartOpen(true)}
                        className="relative flex items-center gap-3 btn-outline-dark"
                        aria-label={`Open cart (${cartCount} items)`}
                    >
                        <ShoppingBag size={16} strokeWidth={1.5} />
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-medium flex items-center justify-center" aria-hidden="true">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Dish List */}
            <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16 lg:py-24">
                {flash?.success ? (
                    <div className="max-w-lg flex items-start gap-4 border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-8" role="alert">
                        <CheckCircle size={20} className="text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                            <p className="font-serif text-xl mb-2">Order Placed</p>
                            <p className="text-sm text-[#6C6863] leading-relaxed">{flash.success}</p>
                        </div>
                    </div>
                ) : (
                    Object.entries(grouped).map(([cat, items]) => (
                        <section key={cat} className="mb-16" aria-labelledby={`order-cat-${cat}`}>
                            <div className="flex items-center gap-6 mb-8">
                                <h2 id={`order-cat-${cat}`} className="font-serif text-3xl font-normal">{CAT_LABELS[cat] || cat}</h2>
                                <div className="flex-1 h-px bg-[#1A1A1A]/8" aria-hidden="true" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map(dish => (
                                    <article key={dish.id} className="group border-t border-[#1A1A1A]/10 pt-5 hover:bg-[#F9F8F6] transition-colors duration-300">
                                        <div className="relative aspect-[4/3] overflow-hidden mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                                            <img
                                                src={dish.image_url}
                                                alt={dish.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                                            />
                                            {dish.is_chefs_special && (
                                                <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#1A1A1A] text-[9px] uppercase tracking-[0.15em] px-2 py-0.5">
                                                    Chef's Special
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="font-serif text-lg font-normal leading-tight">{dish.name}</h3>
                                            <p className="font-serif text-lg text-[#1A1A1A] whitespace-nowrap">€{Number(dish.price).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-[#6C6863] leading-relaxed mb-5 line-clamp-2">{dish.description}</p>
                                        <button
                                            onClick={() => addToCart(dish)}
                                            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6C6863] hover:text-[#D4AF37] transition-colors duration-500 group/btn focus-visible:outline-none focus-visible:underline"
                                            aria-label={`Add ${dish.name} to cart`}
                                        >
                                            <Plus size={14} strokeWidth={1.5} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                                            Add to Order
                                        </button>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>

            {/* Cart Drawer */}
            {cartOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-[#1A1A1A]/40 z-40 transition-opacity duration-700"
                        onClick={() => setCartOpen(false)}
                        aria-hidden="true"
                    />
                    <aside
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#F9F8F6] z-50 shadow-[-8px_0_32px_rgba(0,0,0,0.1)] flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping cart"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-8 border-b border-[#1A1A1A]/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={18} strokeWidth={1.5} />
                                <p className="font-serif text-xl">Your Order</p>
                            </div>
                            <button onClick={() => setCartOpen(false)} className="p-1 text-[#6C6863] hover:text-[#1A1A1A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]" aria-label="Close cart">
                                <X size={18} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Cart items */}
                        <div className="flex-1 overflow-y-auto px-8 py-4">
                            {cart.length === 0 ? (
                                <p className="text-[#6C6863] font-serif italic text-center py-16">Your cart is empty.</p>
                            ) : (
                                <ul>
                                    {cart.map(item => (
                                        <CartItem key={item.dish_id} item={item} onRemove={removeItem} onQty={updateQty} />
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Totals + Checkout */}
                        {cart.length > 0 && !checkout && (
                            <div className="p-8 border-t border-[#1A1A1A]/10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#6C6863]">Total</span>
                                    <span className="font-serif text-2xl">€{total.toFixed(2)}</span>
                                </div>
                                <Button variant="primary" className="w-full justify-center" onClick={() => setCheckout(true)}>
                                    Proceed to Checkout
                                </Button>
                            </div>
                        )}

                        {/* Checkout Form */}
                        {cart.length > 0 && checkout && (
                            <div className="flex-1 overflow-y-auto p-8 border-t border-[#1A1A1A]/10">
                                <button onClick={() => setCheckout(false)} className="text-[11px] uppercase tracking-[0.2em] text-[#6C6863] hover:text-[#1A1A1A] transition-colors mb-8 flex items-center gap-2">
                                    ← Back to Cart
                                </button>
                                <form onSubmit={handleCheckout} noValidate className="flex flex-col gap-8">
                                    <Input id="o-name" label="Full Name" type="text" value={data.customer_name} onChange={e => setData('customer_name', e.target.value)} placeholder="Your full name" required />
                                    <Input id="o-email" label="Email" type="email" value={data.customer_email} onChange={e => setData('customer_email', e.target.value)} placeholder="you@example.com" required />
                                    <Input id="o-phone" label="Phone" type="tel" value={data.customer_phone} onChange={e => setData('customer_phone', e.target.value)} placeholder="+33 1 00 00 00 00" required />
                                    <Input id="o-address" label="Delivery Address (leave blank for pickup)" as="textarea" rows={2} value={data.delivery_address} onChange={e => setData('delivery_address', e.target.value)} placeholder="12 Rue de l'Exemple, Paris…" />
                                    <div>
                                        <div className="flex justify-between mb-4">
                                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6C6863]">Order Total</span>
                                            <span className="font-serif text-xl">€{total.toFixed(2)}</span>
                                        </div>
                                        <Button type="submit" variant="primary" className="w-full justify-center" disabled={processing}>
                                            {processing ? 'Placing Order…' : 'Place Order'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </aside>
                </>
            )}
        </Layout>
    );
}
