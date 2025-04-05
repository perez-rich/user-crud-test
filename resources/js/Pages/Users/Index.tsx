import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { User } from '@/types';

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

            <table>
                <thead></thead>
                <tbody>
                    {users.map((user: User) => {
                        return <tr>
                            <td>{user.name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}
