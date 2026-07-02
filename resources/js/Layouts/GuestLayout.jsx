import { Head } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <>
            {title && <Head title={title} />}
            {children}
        </>
    );
}
