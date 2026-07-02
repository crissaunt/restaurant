import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/confirm-password');
    }

    return (
        <GuestLayout>
            <Head title="Confirm Password" />
            <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-[#1A1A1A]/10 p-8">
                        <h1 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-2 text-center">
                            Confirm Password
                        </h1>
                        <p className="text-sm text-[#6C6863] mb-6 text-center">
                            Please confirm your password before continuing.
                        </p>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    label="Password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                {processing ? 'Confirming...' : 'Confirm'}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
