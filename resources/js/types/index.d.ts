import { Config } from 'ziggy-js';

export interface User {
    id: number;
    type: 'admin' | 'user',
    name: string;
    email: string;
    created_at: string;
    last_login_at: string;
    deactivated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
