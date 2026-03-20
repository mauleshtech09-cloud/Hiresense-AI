import React, { createContext, useContext, useState, useEffect } from 'react';
import { resumeService } from '../services/resumeService';

export interface CandidateScore {
    total: number;
    domainRelevance: number; // 35%
    skillMatch: number;      // 25%
    experienceMatch: number; // 15%
    educationMatch: number;  // 10%
    certifications: number;  // 10%
    supportingSkills: number;// 5%
}

export interface CandidateReport {
    id: string;
    candidateName: string;
    date: string;
    jobRole: string;
    score: number;
    scoreBreakdown: CandidateScore;
    
    // Core Skills (Old)
    topSkills: string[];
    strengths: string[];
    weaknesses: string[];
    
    // New Analytical Features
    candidateDomain: string;
    jobDomain: string;
    domainMatchStatus: 'Match' | 'Mismatch' | 'Partial Match';
    matchedSkills: string[];
    missingCriticalSkills: string[];
    experienceEvaluation: string;
    educationAlignment: string;
    criticalGaps: string[];
    
    roleSuitability: string; // The evaluation prose
    recommendation: 'Highly Suitable' | 'Moderately Suitable' | 'Low Suitability' | 'Not Suitable';
    
    // Master 10-Section JSON output from AI Engine
    masterAnalysis?: any;
}

interface AppStateContextType {
    history: CandidateReport[];
    addReportToHistory: (report: CandidateReport) => void;
    deleteReport: (id: string) => void;
    currentReport: CandidateReport | null;
    setCurrentReport: (report: CandidateReport | null) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<CandidateReport[]>(() => {
        const saved = localStorage.getItem('hireSense_history');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentReport, setCurrentReport] = useState<CandidateReport | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await resumeService.getHistory();
                if (data && Array.isArray(data)) {
                    setHistory(data);
                }
            } catch (e) {
                console.error("Failed to load history from backend", e);
            }
        };
        fetchHistory();
    }, []);

    const addReportToHistory = (report: CandidateReport) => {
        resumeService.saveReport(report).catch(e => console.error(e));
        setHistory(prev => {
            // Avoid duplicates
            if (prev.find(r => r.id === report.id)) return prev;
            return [report, ...prev];
        });
    };

    const deleteReport = (id: string) => {
        setHistory(prev => prev.filter(r => r.id !== id));
    };

    return (
        <AppStateContext.Provider value={{ history, addReportToHistory, deleteReport, currentReport, setCurrentReport }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};
