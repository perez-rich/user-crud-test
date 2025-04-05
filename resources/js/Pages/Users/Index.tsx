import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User } from '@/types';
import { shortFormat } from '@/utils/dates';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

interface ListProps {
    auth: {
        user: User;
    };
    filters: {
        search: string;
        type: string;
    };
    users: User[]
}

export default function Index({ auth, filters, users }: ListProps) {
    const { data, setData, get, processing, errors, reset } = useForm({
        search: filters.search || '',
        type: filters.type || '',
    });

    const submitSearch: FormEventHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const search = formData.get('search') as string;
        const type = formData.get('type') as string;

        get(route('users.index', { search, type }));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <section>
                <div className="flex justify-between items-center">
                    <form className="flex gap-2" onSubmit={submitSearch}>
                        <TextInput placeholder="Enter Search" value={data.search} onChange={(e) => setData('search', e.target.value)}></TextInput>
                        <select value={data.type} onChange={(e) => setData('type', e.target.value)}>
                            <option value="">All</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <PrimaryButton>Filter</PrimaryButton>
                    </form>
                    <Link href={route('users.create')} className="btn btn-sm btn-success text-white">
                        Create User
                    </Link>
                </div>
            </section>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Deactivated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => {
                        return <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.type}</td>
                            <td>{user.email}</td>
                            <td>{shortFormat(user.last_login_at)}</td>
                            <td>{shortFormat(user.deactivated_at)}</td>
                            <td className="flex gap-2">
                                {user.deactivated_at
                                    ? null
                                    : <Link href={route('users.edit', [user.id])} className="btn btn-xs btn-primary">
                                        Edit
                                    </Link>
                                }
                                {user.deactivated_at
                                    ? <Link href={route('users.restore', [user.id])} className="btn btn-xs btn-link text-green-600" method="post" as="button">
                                        Activate
                                    </Link>
                                    : <Link href={route('users.delete', [user.id])} className="btn btn-xs btn-link text-red-600" method="delete" as="button">
                                        Deactivate
                                    </Link>
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}
