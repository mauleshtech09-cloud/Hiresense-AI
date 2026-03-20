const BASE_URL = 'http://localhost:3001/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('hiresense_token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    
    if (token) {
        headers['Authorization'] = token;
    }
    
    // Auto-remove content type for multipart forms
    if (options.body instanceof FormData) {
        delete (headers as Record<string, string>)['Content-Type'];
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    });
    
    if (!response.ok) {
        let errorMsg = 'An error occurred';
        try {
            const errResult = await response.json();
            errorMsg = errResult.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
    }
    return response.json();
};
