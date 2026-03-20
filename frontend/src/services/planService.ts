import { apiFetch } from './apiService';

export const planService = {
    upgrade: async (plan: string, billingCycle: string) => {
        return apiFetch('/plan/upgrade', {
            method: 'POST',
            body: JSON.stringify({ plan, billingCycle })
        });
    }
};
