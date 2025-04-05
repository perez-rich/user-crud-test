import { PropsWithChildren, ReactNode } from 'react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {    return (
        <div className="min-h-screen bg-white">
            <nav className="navbar bg-base-100">
                <div className="flex-1">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                        </li>
                    {user.type == 'admin' && <li>
                        <NavLink href={route('users.index')} active={route().current('users.index')}>
                            Users
                        </NavLink>
                    </li>}
                    </ul>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal gap-2 px-1 align-middle items-center">
                        <li>{user.name}</li>
                        <li>
                            <Link href={route('logout')} method="post" as="button">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow p-4">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="p-4">{children}</main>
        </div>
    );
}
