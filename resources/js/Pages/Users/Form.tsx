import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { User } from '@/types';
import { shortFormat } from '@/utils/dates';

interface ListProps {
    auth: {
        user: User;
    };
}

export default function Dashboard({ auth }: ListProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Edit User #{auth.user.id}
            </h2>}
        >
            <Head title={`Edit User #${auth.user.id}`} />
        </AuthenticatedLayout>
    );
}
