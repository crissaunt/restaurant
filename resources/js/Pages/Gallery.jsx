import { Head } from '@inertiajs/react';
import Layout from './Layout';

const PHOTOS = [
    { src: '/images/plated-venison.jpg', alt: 'A beautifully plated venison loin', size: 'tall' },
    { src: '/images/chef-kitchen.jpg',  alt: 'Chef at work in the kitchen', size: 'normal' },
    { src: '/images/restaurant-interior.jpg', alt: 'Restaurant interior at candlelight', size: 'normal' },
    { src: '/images/chocolate-ganache.jpg',  alt: 'Dark chocolate and cep ganache dessert', size: 'wide' },
    { src: '/images/wild-mushrooms.jpg',  alt: 'Wild chantarelle mushroom appetizer', size: 'normal' },
    { src: '/images/venison-loin.jpg',  alt: 'Dry-aged venison with juniper reduction', size: 'normal' },
    { src: '/images/wood-fired-octopus.jpg', alt: 'Wood-fired octopus with sea fennel', size: 'tall' },
    { src: '/images/heirloom-tomato.jpg', alt: 'Heirloom tomato foraged moss composition', size: 'normal' },
    { src: '/images/truffle-gnocchi.jpg', alt: 'Winter truffle gnocchi in hazelnut butter', size: 'normal' },
    { src: '/images/honey-parfait.jpg', alt: 'Pine honey parfait with pollen crumble', size: 'wide' },
    { src: '/images/glacier-toothfish.jpg', alt: 'Glacier toothfish in sea vegetable broth', size: 'normal' },
    { src: '/images/spruce-elixir.jpg', alt: 'Spruce needle elderflower elixir', size: 'normal' },
];

export default function Gallery() {
    return (
        <Layout>
            <Head title="Gallery" />

            {/* Header */}
            <div className="pt-32 pb-16 lg:pt-44 lg:pb-20 border-b border-[#1A1A1A]/10">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863] mb-4">Visual Journal</p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95]">
                        The <span className="italic text-[#D4AF37]">Gallery</span>
                    </h1>
                    <p className="text-sm text-[#6C6863] leading-relaxed mt-6 max-w-md">
                        Hover each image to reveal it in full colour. Every photograph is taken in natural light, never staged.
                    </p>
                </div>
            </div>

            {/* Masonry-style editorial grid */}
            <section className="py-16 lg:py-24" aria-label="Photo gallery">
                <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {PHOTOS.map((photo, i) => (
                            <figure
                                key={i}
                                className="group relative overflow-hidden break-inside-avoid shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-700"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    loading="lazy"
                                    className={`w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out
                                        ${photo.size === 'tall'   ? 'aspect-[3/4]' : ''}
                                        ${photo.size === 'wide'   ? 'aspect-[16/9]': ''}
                                        ${photo.size === 'normal' ? 'aspect-[4/5]' : ''}
                                    `}
                                />
                                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" aria-hidden="true" />
                                <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1A1A]/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                    <p className="text-[11px] text-[#EBE5DE]/80 uppercase tracking-[0.15em]">{photo.alt}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
