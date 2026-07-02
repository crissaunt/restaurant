import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function VerifyEmail({ status }) {
    return (
        <GuestLayout>
            <Head title="Verify Email" />
            <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] px-4">
                <div className="w-full max-w-md text-center">
                    <h1 className="font-serif text-3xl font-normal text-[#1A1A1A] mb-4">
                        Verify your email
                    </h1>
                    <p className="text-sm text-[#6C6863]">
                        A verification link has been sent to your email address.
                    </p>
                    {status && (
                        <div className="mt-4 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-sm text-[#1A1A1A]">
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
