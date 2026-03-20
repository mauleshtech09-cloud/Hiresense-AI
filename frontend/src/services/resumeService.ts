import { apiFetch } from './apiService';

export const resumeService = {
    analyze: async (file: File, jobRole: string, isReassess: boolean = false) => {
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobRole', jobRole);
        formData.append('isReassess', isReassess.toString());
        
        return apiFetch('/resume/analyze', {
            method: 'POST',
            body: formData
        });
    },
    saveReport: async (report: any) => {
        return apiFetch('/report/save', {
            method: 'POST',
            body: JSON.stringify(report)
        });
    },
    getHistory: async () => {
        return apiFetch('/report/history');
    }
};
