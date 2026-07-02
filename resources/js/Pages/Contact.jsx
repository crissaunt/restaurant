import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from './Layout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, CheckCircle } from 'lucide-react';

const HOURS = [
    { day: 'Tuesday',   hours: '18:00 – 23:00' },
    { day: 'Wednesday', hours: '18:00 – 23:00' },
    { day: 'Thursday',  hours: '18:00 – 23:00' },
    { day: 'Friday',    hours: '18:00 – 23:30' },
    { day: 'Saturday',  hours: '18:00 – 23:30' },
    { day: 'Sunday',    hours: 'Closed' },
    { day: 'Monday',    hours: 'Closed' },
];

export default function Contact() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    }

    return (
        <Layout>
            <Head title="Contact & Location" />

            {/* Header */}
            <div className="pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-[#1A1A1A]/10">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Get in Touch</p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95]">
                        Contact <span className="italic text-[#D4AF37]">&amp; Location</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* ── Contact Details ──────────────────── */}
                    <div className="lg:col-span-4">
                        <div className="space-y-12">
                            {/* Address */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <MapPin size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863]">Address</p>
                                </div>
                                <address className="not-italic text-sm text-[#1A1A1A] leading-relaxed">
                                    12 Rue de la Forêt<br />
                                    75008 Paris, France
                                </address>
                            </div>

                            {/* Phone */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Phone size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863]">Telephone</p>
                                </div>
                                <a href="tel:+33140000000" className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-500">
                                    +33 1 40 00 00 00
                                </a>
                            </div>

                            {/* Email */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Mail size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863]">Email</p>
                                </div>
                                <a href="mailto:reservations@etoilesauvage.com" className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-500 break-all">
                                    reservations@etoilesauvage.com
                                </a>
                            </div>

                            {/* Hours */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863]">Opening Hours</p>
                                </div>
                                <div className="space-y-2">
                                    {HOURS.map(({ day, hours }) => (
                                        <div key={day} className="flex justify-between text-sm gap-4">
                                            <span className={hours === 'Closed' ? 'text-[#6C6863]' : 'text-[#1A1A1A]'}>{day}</span>
                                            <span className={hours === 'Closed' ? 'text-[#6C6863] italic' : 'text-[#6C6863]'}>{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Follow Us</p>
                                <div className="flex gap-4">
                                    {[
                                        { href: '#', icon: Instagram, label: 'Instagram' },
                                        { href: '#', icon: Facebook, label: 'Facebook' },
                                        { href: '#', icon: Twitter,  label: 'X / Twitter' },
                                    ].map(({ href, icon: Icon, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            aria-label={label}
                                            className="w-9 h-9 border border-[#1A1A1A]/20 flex items-center justify-center text-[#6C6863] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                                        >
                                            <Icon size={14} strokeWidth={1.5} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Map + Form ───────────────────────── */}
                    <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-16">
                        {/* Google Map */}
                        <div className="w-full aspect-[16/9] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                            <iframe
                                title="L'Étoile Sauvage location map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.0!2d2.3088!3d48.8736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUyJzI0LjAiTiAywrAxOCczMS43IkU!5e0!3m2!1sen!2sfr!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                aria-label="Map showing L'Étoile Sauvage restaurant location in Paris"
                            />
                        </div>

                        {/* Contact Form */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-6">Send a Message</p>

                            {flash?.success ? (
                                <div className="flex items-start gap-4 border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-8" role="alert">
                                    <CheckCircle size={20} className="text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                    <div>
                                        <p className="font-serif text-xl mb-2">Message Sent</p>
                                        <p className="text-sm text-[#6C6863] leading-relaxed">{flash.success}</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10" aria-label="Contact form">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                        <div>
                                            <Input id="c-name" label="Full Name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Your full name" required aria-describedby={errors.name ? 'c-name-err' : undefined} />
                                            {errors.name && <p id="c-name-err" className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <Input id="c-email" label="Email Address" type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="you@example.com" required aria-describedby={errors.email ? 'c-email-err' : undefined} />
                                            {errors.email && <p id="c-email-err" className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <Input as="textarea" id="c-message" label="Message" value={data.message} onChange={e => setData('message', e.target.value)} placeholder="How can we help you?" rows={5} required aria-describedby={errors.message ? 'c-msg-err' : undefined} />
                                        {errors.message && <p id="c-msg-err" className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                                    </div>
                                    <div>
                                        <Button type="submit" variant="primary" disabled={processing}>
                                            {processing ? 'Sending…' : 'Send Message'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
