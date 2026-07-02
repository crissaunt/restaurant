import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Layout from './Layout';
import { ArrowRight } from 'lucide-react';

const TEAM = [
    {
        name: 'Aurélie Fontaine',
        role: 'Executive Chef & Founder',
        bio: 'Trained under Alain Passard at L\'Arpège, Aurélie left haute cuisine to pursue a more elemental path — one guided by the seasons and the wild.',
        img: '/images/chef-aurelie.jpg',
    },
    {
        name: 'Marc Delvaux',
        role: 'Head Sommelier',
        bio: 'A Burgundy native, Marc curates a wine list built around organic and biodynamic producers whose work mirrors our philosophy of living lightly on the land.',
        img: '/images/sommelier-marc.jpg',
    },
    {
        name: 'Inès Bergeron',
        role: 'Pastry Chef',
        bio: 'Inès brings a botanical eye to dessert, drawing on foraged flowers, woodland fungi, and ancient grains to compose endings as poetic as the courses before them.',
        img: '/images/pastry-ines.jpg',
    },
];

const VALUES = [
    { title: 'Terroir', body: 'Every ingredient traces its lineage to a specific place. We celebrate provenance, not commodity.' },
    { title: 'Restraint', body: 'We do less, better. The plate is an edit — a reduction of everything that does not serve the dish.' },
    { title: 'Seasons', body: 'The menu changes with the land. We do not coax ingredients out of season. We wait.' },
    { title: 'Silence', body: 'A great meal benefits from quiet. The dining room is designed for conversation, not performance.' },
];

export default function About() {
    return (
        <Layout>
            <Head title="Our Story" />

            {/* Hero */}
            <div className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/restaurant-interior.jpg"
                        alt="Restaurant interior at golden hour"
                        className="w-full h-full object-cover grayscale opacity-20"
                    />
                </div>
                <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-6">Our Story</p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95]">
                        The <span className="italic text-[#D4AF37]">philosophy</span><br />behind the plate
                    </h1>
                </div>
            </div>

            {/* Story Section */}
            <section className="py-20 lg:py-32" aria-labelledby="story-heading">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-6">
                            <h2 id="story-heading" className="sr-only">Our Story</h2>
                            <div className="text-base text-[#1A1A1A] leading-relaxed space-y-6">
                                <p className="drop-cap">
                                    L'Étoile Sauvage was born in 2019 from a conviction: that the finest ingredients exist not in curated greenhouses, but in the living wilderness — in ancient forests, coastal shores, and highland meadows. We named ourselves after the wild star flower that blooms each spring in the forests of the Vosges, unrepeatable and fleeting.
                                </p>
                                <p>
                                    Chef Aurélie Fontaine and her team forage alongside local botanists each season, composing menus that are never repeated and always unrepeatable. We work with a network of small-scale farmers, coastal fishers, and foragers who share our commitment to living lightly.
                                </p>
                                <p>
                                    The dining room was designed by architect Luca Bianchi as an exercise in restraint — warm stone, aged linen, candlelight. Nothing competes with the food. We have 48 seats and take no more than one sitting per evening.
                                </p>
                                <p className="text-[#6C6863]">
                                    In 2023, we were awarded three Michelin stars — an honour we accept with humility, knowing that the truest measure of our work is whether each guest leaves having tasted something they cannot find anywhere else on earth.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="group relative aspect-[4/5] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                                <img
                                    src="/images/plated-venison.jpg"
                                    alt="Chef Aurélie preparing a dish"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 lg:py-32 bg-[#1A1A1A]" aria-labelledby="values-heading">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">What We Believe</p>
                    <h2 id="values-heading" className="font-serif text-4xl md:text-5xl text-[#F9F8F6] font-normal mb-16 leading-[1.05]">
                        Four <span className="italic text-[#D4AF37]">principles</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#F9F8F6]/10">
                        {VALUES.map((v, i) => (
                            <div key={v.title} className="px-0 md:px-8 first:pl-0 last:pr-0 py-8 md:py-0">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">0{i + 1}</p>
                                <h3 className="font-serif text-2xl text-[#F9F8F6] font-normal mb-4">{v.title}</h3>
                                <p className="text-sm text-[#EBE5DE]/60 leading-relaxed">{v.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 lg:py-32" aria-labelledby="team-heading">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">The People</p>
                    <h2 id="team-heading" className="font-serif text-4xl md:text-5xl font-normal mb-16 leading-[1.05]">
                        Behind the <span className="italic text-[#D4AF37]">kitchen</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {TEAM.map(member => (
                            <div key={member.name} className="group">
                                <div className="relative aspect-[3/4] overflow-hidden mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)] transition-shadow duration-700">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                                    />
                                </div>
                                <div className="border-t border-[#1A1A1A]/10 pt-5">
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#6C6863] mb-2">{member.role}</p>
                                    <h3 className="font-serif text-xl font-normal mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">{member.name}</h3>
                                    <p className="text-sm text-[#6C6863] leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-[#1A1A1A]/10" aria-label="Next steps">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-3">Ready to Dine?</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-normal">Secure your <span className="italic text-[#D4AF37]">table</span></h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/reservations" className="btn-dark">
                            Reserve a Table
                        </Link>
                        <Link href="/menu" className="btn-outline-dark">Explore the Menu</Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
