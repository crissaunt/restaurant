import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/register');
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="font-serif text-4xl font-normal text-[#1A1A1A] mb-2">
                            L'Étoile <span className="italic">Sauvage</span>
                        </h1>
                        <p className="text-sm text-[#6C6863]">Create an account</p>
                    </div>

                    <div className="bg-white border border-[#1A1A1A]/10 p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <TextInput
                                    id="name"
                                    label="Name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    label="Email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
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

                            <div>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    label="Confirm Password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                {processing ? 'Creating account...' : 'Register'}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
