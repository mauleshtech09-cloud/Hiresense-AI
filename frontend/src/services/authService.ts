import { apiFetch } from './apiService';

export const authService = {
    login: async (email: string) => {
        return apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    },
    register: async (data: any) => {
        return apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    getProfile: async () => {
        return apiFetch('/profile');
    }
};
