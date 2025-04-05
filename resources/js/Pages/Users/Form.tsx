import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { User } from '@/types';
import { FormEventHandler, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Dropdown from '@/Components/Dropdown';
import Checkbox from '@/Components/Checkbox';

interface ListProps {
    auth: {
        user: User;
    },
    user: User | null;
    types: string[];
}

export default function Form({ auth, user, types }: ListProps) {
    const { data, setData, post, processing, errors, reset } = useForm(user);
    const heading = user?.id ? 'Edit User' : 'Create User';

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (user?.id) {
            post(route('users.update', user.id));
        }
        else {
            post(route('users.store'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {heading}
            </h2>}
        >
            <Head title={heading} />

            <div className="card card-normal shadow-xl w-1/2">
                <div className="card-body">
                    <form className="flex flex-col gap-4" onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <InputLabel htmlFor="type" value="Type" />
                            <div className="flex capitalize gap-2">
                                {types.map(type => {
                                    return <>
                                        <Checkbox key={type} onChange={e => setData('type', e.target.value)} value={type} checked={type === data.type}></Checkbox>
                                        <InputLabel htmlFor="type" value={type} />
                                    </>;
                                })}
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
