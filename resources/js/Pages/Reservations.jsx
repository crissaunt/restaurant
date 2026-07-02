import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from './Layout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { CheckCircle } from 'lucide-react';

const TIMES = [
    '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00',
];

export default function Reservations() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name:   '',
        email:  '',
        phone:  '',
        date:   '',
        time:   '19:00',
        guests: 2,
        notes:  '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/reservations', { onSuccess: () => reset() });
    }

    return (
        <Layout>
            <Head title="Reservations" />

            {/* Header */}
            <div className="pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-[#1A1A1A]/10">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Book Your Evening</p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95]">
                        Reserve a <span className="italic text-[#D4AF37]">Table</span>
                    </h1>
                    <p className="text-base text-[#6C6863] leading-relaxed max-w-md mt-6">
                        Tables are limited to 48 guests per evening. Bookings open 60 days in advance. We will confirm your reservation within 24 hours.
                    </p>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Form */}
                    <div className="lg:col-span-7">
                        {flash?.success ? (
                            <div className="flex items-start gap-4 border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-8" role="alert">
                                <CheckCircle size={20} className="text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <div>
                                    <p className="font-serif text-xl mb-2">Reservation Received</p>
                                    <p className="text-sm text-[#6C6863] leading-relaxed">{flash.success}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
                                    <div>
                                        <Input
                                            id="res-name"
                                            label="Full Name"
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            placeholder="Your full name"
                                            required
                                            aria-describedby={errors.name ? 'res-name-err' : undefined}
                                        />
                                        {errors.name && <p id="res-name-err" className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <Input
                                            id="res-email"
                                            label="Email Address"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            aria-describedby={errors.email ? 'res-email-err' : undefined}
                                        />
                                        {errors.email && <p id="res-email-err" className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Input
                                            id="res-phone"
                                            label="Phone Number"
                                            type="tel"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            placeholder="+33 1 00 00 00 00"
                                            required
                                        />
                                        {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <Input
                                            id="res-date"
                                            label="Date"
                                            type="date"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                        {errors.date && <p className="text-[11px] text-red-600 mt-1">{errors.date}</p>}
                                    </div>

                                    {/* Time selector */}
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="res-time" className="text-[10px] uppercase tracking-[0.25em] text-[#6C6863] font-medium">
                                            Preferred Time
                                        </label>
                                        <select
                                            id="res-time"
                                            value={data.time}
                                            onChange={e => setData('time', e.target.value)}
                                            className="input-underline bg-transparent appearance-none cursor-pointer"
                                        >
                                            {TIMES.map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                        {errors.time && <p className="text-[11px] text-red-600 mt-1">{errors.time}</p>}
                                    </div>

                                    {/* Guests */}
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="res-guests" className="text-[10px] uppercase tracking-[0.25em] text-[#6C6863] font-medium">
                                            Number of Guests
                                        </label>
                                        <div className="flex items-center gap-4 border-b border-[#1A1A1A] py-2.5">
                                            <button
                                                type="button"
                                                onClick={() => setData('guests', Math.max(1, data.guests - 1))}
                                                className="text-[#6C6863] hover:text-[#1A1A1A] transition-colors w-6 h-6 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                                                aria-label="Decrease guest count"
                                            >
                                                −
                                            </button>
                                            <span id="res-guests" className="font-serif text-xl flex-1 text-center" aria-live="polite" aria-label={`${data.guests} guests`}>
                                                {data.guests}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setData('guests', Math.min(20, data.guests + 1))}
                                                className="text-[#6C6863] hover:text-[#1A1A1A] transition-colors w-6 h-6 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                                                aria-label="Increase guest count"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {errors.guests && <p className="text-[11px] text-red-600 mt-1">{errors.guests}</p>}
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <Input
                                        as="textarea"
                                        id="res-notes"
                                        label="Special Notes (Optional)"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        placeholder="Allergies, occasions, dietary requirements…"
                                        rows={3}
                                    />
                                </div>

                                <Button type="submit" variant="primary" disabled={processing}>
                                    {processing ? 'Sending Request…' : 'Confirm Reservation'}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-4 lg:col-start-9">
                        <div className="border-t border-[#1A1A1A]/10 pt-8 space-y-10">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Opening Hours</p>
                                <div className="text-sm text-[#1A1A1A] space-y-2">
                                    <div className="flex justify-between gap-4">
                                        <span>Tuesday – Saturday</span>
                                        <span className="text-[#6C6863]">18:00 – 23:00</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span>Sunday – Monday</span>
                                        <span className="text-[#6C6863]">Closed</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Cancellation Policy</p>
                                <p className="text-sm text-[#6C6863] leading-relaxed">
                                    Reservations may be cancelled up to 48 hours before the booking. Late cancellations may incur a fee of €75 per person.
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Group Bookings</p>
                                <p className="text-sm text-[#6C6863] leading-relaxed">
                                    For parties of 10 or more, or for private hire, please contact us directly at <a href="mailto:reservations@etoilesauvage.com" className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-500">reservations@etoilesauvage.com</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
