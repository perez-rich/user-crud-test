import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>

            {auth.user.type == 'admin'
                ? <div className="py-4">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="p-6 flex flex-col gap-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <h3>Hello {auth.user.name}!</h3>
                            <p>Click the button below to manage your users.</p>
                            <Link href="/users" className="btn btn-primary">Manage Users</Link>
                        </div>
                    </div>
                </div>
                : null}
        </AuthenticatedLayout>
    );
}
