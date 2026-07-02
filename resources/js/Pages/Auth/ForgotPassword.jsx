import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/forgot-password');
    }

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-[#1A1A1A]/10 p-8">
                        <h1 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-2 text-center">
                            Forgot password?
                        </h1>
                        <p className="text-sm text-[#6C6863] mb-6 text-center">
                            Enter your email and we'll send you a reset link.
                        </p>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    label="Email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                {processing ? 'Sending...' : 'Send reset link'}
                            </PrimaryButton>
                        </form>
                        {status && (
                            <div className="mt-4 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-sm text-center">
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
