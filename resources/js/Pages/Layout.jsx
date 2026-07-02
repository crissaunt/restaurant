import { usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import NoiseOverlay from '@/Components/NoiseOverlay';
import Gridlines from '@/Components/Gridlines';

export default function Layout({ children, title }) {
    return (
        <>
            <NoiseOverlay />
            <Gridlines />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
        </>
    );
}
