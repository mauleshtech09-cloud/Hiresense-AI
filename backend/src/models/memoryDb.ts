import fs from 'fs';
import path from 'path';

// Mock DB Interfaces
export interface User {
    id: string;
    email: string;
    name: string;
    password?: string;
    industry?: string;
    location?: string;
}

export interface Organization {
    id: string;
    name: string;
    plan: 'Basic' | 'Pro' | 'Enterprise';
    scanCount: number;
    billingCycle: 'monthly' | 'yearly';
}

export interface CandidateReport {
    id: string;
    candidateName: string;
    date: string;
    jobRole: string;
    score: number;
    scoreBreakdown: any;
    topSkills: string[];
    strengths: string[];
    weaknesses: string[];
    candidateDomain: string;
    jobDomain: string;
    domainMatchStatus: string;
    matchedSkills: string[];
    missingCriticalSkills: string[];
    experienceEvaluation: string;
    educationAlignment: string;
    criticalGaps: string[];
    roleSuitability: string;
    recommendation: string;
}

// In-Memory DB Objects
class MemoryDB {
    users: User[] = [];
    organizations: Organization[] = [];
    reports: CandidateReport[] = [];
    
    constructor() {
        // Preload some mock data as requested
        this.users.push({ id: 'u1', email: 'demo@hiresense.ai', name: 'Demo User' });
        this.organizations.push({ id: 'org1', name: 'Tech Innovations Inc', plan: 'Pro', scanCount: 0, billingCycle: 'monthly' });
    }

    findUserByEmail(email: string) {
        return this.users.find(u => u.email === email);
    }
}

export const db = new MemoryDB();
