import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { User } from '@/types';
import { shortFormat } from '@/utils/dates';

interface ListProps {
    auth: {
        user: User;
    };
    users: User[]
}

export default function Dashboard({ auth, users }: ListProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Deactivated</th>
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
                                <Link href={`/users/${user.id}/edit`} className="btn btn-xs btn-primary">
                                    Edit
                                </Link>
                                <Link href={`/users/${user.id}/delete`} className="btn btn-xs btn-link">
                                    Deactivate
                                </Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}
