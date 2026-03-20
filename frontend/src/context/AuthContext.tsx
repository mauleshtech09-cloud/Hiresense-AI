import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export interface Organization {
    username: string;
    name: string;
    plan: 'Basic' | 'Intermediate' | 'Pro' | 'Master';
    dailyLimit: number;
    reportLimit: number;
    scansUsedToday: number;
    reportsUsedToday: number;
    email: string;
    phone: string;
    contactPerson: string;
    industry?: string;
    location?: string;
}

const PRE_REGISTERED_ORGS: Organization[] = [
    { username: 'org1', name: 'StartUp Inc', plan: 'Basic', dailyLimit: 3, reportLimit: 1, scansUsedToday: 0, reportsUsedToday: 0, email: 'contact@startupinc.com', phone: '123-456-7890', contactPerson: 'Alice' },
    { username: 'org2', name: 'Growth Corp', plan: 'Intermediate', dailyLimit: 20, reportLimit: 10, scansUsedToday: 0, reportsUsedToday: 0, email: 'hr@growthcorp.com', phone: '234-567-8901', contactPerson: 'Bob' },
    { username: 'org3', name: 'Enterprise LLC', plan: 'Pro', dailyLimit: 100, reportLimit: 100, scansUsedToday: 0, reportsUsedToday: 0, email: 'careers@enterprisellc.com', phone: '345-678-9012', contactPerson: 'Charlie' },
    { username: 'org4', name: 'Global Tech', plan: 'Master', dailyLimit: 500, reportLimit: 9999, scansUsedToday: 0, reportsUsedToday: 0, email: 'recruitment@globaltech.com', phone: '456-789-0123', contactPerson: 'Diana' },
];

interface AuthContextType {
    org: Organization | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateOrg: (updates: Partial<Organization>) => void;
    incrementScan: () => boolean;
    incrementReport: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [org, setOrg] = useState<Organization | null>(null);

    const login = async (username: string, password: string) => {
        // Hardcoded passwords per PRD
        const passwords: Record<string, string> = {
            org1: '123456',
            org2: 'abcdefg',
            org3: '123456789',
            org4: 'abcdefghijklmnop'
        };

        if (passwords[username] === password) {
            const foundInstance = PRE_REGISTERED_ORGS.find(o => o.username === username);
            if (foundInstance) {
                try {
                    const res = await authService.login(foundInstance.email || username + '@hiresense.ai');
                    localStorage.setItem('hiresense_token', res.token);
                    setOrg(foundInstance);
                    return true;
                } catch (e) {
                    console.error("Login failed", e);
                }
            }
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('hiresense_token');
        setOrg(null);
    };

    const updateOrg = (updates: Partial<Organization>) => {
        setOrg(prev => prev ? { ...prev, ...updates } : null);
    };

    const incrementScan = () => {
        if (!org) return false;
        if (org.scansUsedToday >= org.dailyLimit) return false;
        updateOrg({ scansUsedToday: org.scansUsedToday + 1 });
        return true;
    };

    const incrementReport = () => {
        if (!org) return false;
        if (org.reportsUsedToday >= org.reportLimit) return false;
        updateOrg({ reportsUsedToday: org.reportsUsedToday + 1 });
        return true;
    };

    return (
        <AuthContext.Provider value={{ org, login, logout, updateOrg, incrementScan, incrementReport }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
