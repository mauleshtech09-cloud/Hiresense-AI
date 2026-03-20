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
declare class MemoryDB {
    users: User[];
    organizations: Organization[];
    reports: CandidateReport[];
    constructor();
    findUserByEmail(email: string): User | undefined;
}
export declare const db: MemoryDB;
export {};
//# sourceMappingURL=memoryDb.d.ts.map