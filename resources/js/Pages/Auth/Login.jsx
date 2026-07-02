import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="font-serif text-4xl font-normal text-[#1A1A1A] mb-2">
                            L'Étoile <span className="italic">Sauvage</span>
                        </h1>
                        <p className="text-sm text-[#6C6863]">Admin Panel</p>
                    </div>

                    <div className="bg-white border border-[#1A1A1A]/10 p-8">
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

                            <div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    label="Password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="rounded border-[#1A1A1A]/20"
                                    />
                                    <span className="text-sm text-[#6C6863]">Remember me</span>
                                </label>
                            </div>

                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                {processing ? 'Logging in...' : 'Log in'}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
