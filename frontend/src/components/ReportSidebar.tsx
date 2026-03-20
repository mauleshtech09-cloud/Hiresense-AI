import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../context/AppStateContext';
import type { CandidateReport } from '../context/AppStateContext';
import { useAuth } from '../context/AuthContext';
import { X, Save, RefreshCw, MessageSquare, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import SkillRadarChart from './RadarChart';

interface ReportSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    report: CandidateReport | null;
    onReassess: () => void;
}

const ReportSidebar: React.FC<ReportSidebarProps> = ({ isOpen, onClose, report, onReassess }) => {
    const { addReportToHistory } = useAppState();
    const { incrementReport: incrementAuthReport } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);

    if (!report) return null;

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            addReportToHistory({
                ...report,
                id: Math.random().toString(36).substr(2, 9)
            });
            incrementAuthReport();
            setIsSaving(false);
            onClose();
        }, 800);
    };

    const radarData = [
        { skill: 'Domain', score: report.scoreBreakdown.domainRelevance },
        { skill: 'Skills', score: report.scoreBreakdown.skillMatch },
        { skill: 'Experience', score: report.scoreBreakdown.experienceMatch },
        { skill: 'Education', score: report.scoreBreakdown.educationMatch },
        { skill: 'Certs', score: report.scoreBreakdown.certifications }
    ];

    const mockQuestions = [
        `Can you describe your experience heavily utilizing ${report.topSkills[0]} in a past project?`,
        `How do you compensate for your lack of experience in some of the required backend technologies?`,
        `What was your most challenging problem relating to ${report.topSkills[1] || 'software development'}?`
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900 z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 overflow-y-auto border-l border-gray-200"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Resume Scan Report</h2>
                                <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            <div className="mb-8 flex items-center gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                <div className="w-16 h-16 rounded-full border-4 border-indigo-500 flex items-center justify-center bg-white text-xl font-bold text-indigo-700 shadow-sm">
                                    {report.score}%
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{report.candidateName}</h3>
                                    <p className="text-sm text-indigo-600 font-medium">{report.jobRole}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Candidate Domain Identification</h4>
                                    <div className={`p-4 rounded-lg border text-sm leading-relaxed ${report.domainMatchStatus === 'Match' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                        <div className="font-bold mb-1">
                                            Status: {report.domainMatchStatus}
                                        </div>
                                        <p>
                                            Resume indicates primary expertise in <strong>{report.candidateDomain}</strong>.
                                            Job role belongs to <strong>{report.jobDomain}</strong>.
                                        </p>
                                    </div>
                                </div>

                                <SkillRadarChart data={radarData} />

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skill Alignment Analysis</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <h5 className="text-xs font-bold text-gray-700 mb-2 border-b pb-1">Matching Skills</h5>
                                            <ul className="space-y-1">
                                                {report.matchedSkills.map((s, i) => (
                                                    <li key={i} className="flex items-start text-xs text-gray-600">
                                                        <CheckCircle className="w-3 h-3 text-green-500 mr-1.5 shrink-0 mt-0.5" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <h5 className="text-xs font-bold text-gray-700 mb-2 border-b pb-1">Missing Critical Skills</h5>
                                            <ul className="space-y-1">
                                                {report.missingCriticalSkills.map((w, i) => (
                                                    <li key={i} className="flex items-start text-xs text-gray-600">
                                                        <AlertTriangle className="w-3 h-3 text-red-400 mr-1.5 shrink-0 mt-0.5" />
                                                        {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Experience Evaluation</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        {report.experienceEvaluation}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Education Alignment</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        {report.educationAlignment}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Critical Gaps</h4>
                                    <ul className="space-y-2 bg-amber-50 p-4 rounded-lg border border-amber-200">
                                        {report.criticalGaps.map((gap, i) => (
                                            <li key={i} className="flex items-start text-amber-900 text-sm font-medium">
                                                <AlertTriangle className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5" />
                                                {gap}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Final Conclusion</h4>
                                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-sm font-bold text-indigo-900 border-l-4 border-l-indigo-600 flex flex-col gap-2">
                                        <span>Assessment: {report.recommendation}</span>
                                        <span className="font-normal text-indigo-700">{report.roleSuitability}</span>
                                    </div>
                                </div>

                                {/* Extra Feature: Interview Qs */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => setShowQuestions(!showQuestions)}
                                        className="flex justify-between items-center w-full py-3 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors font-medium text-sm"
                                    >
                                        <span className="flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Suggested Interview Questions
                                        </span>
                                        <ArrowRight className={`w-4 h-4 transition-transform ${showQuestions ? 'rotate-90' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {showQuestions && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="mt-3 space-y-3 bg-white p-4 rounded-lg border border-purple-100 shadow-inner text-sm text-gray-700">
                                                    {mockQuestions.map((q, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="font-bold text-purple-400">Q{i + 1}.</span> {q}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                            </div>

                            <div className="mt-10 flex gap-3 sticky bottom-0 bg-white pt-4 pb-6 border-t border-gray-100">
                                <button
                                    onClick={onReassess}
                                    className="flex-1 flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2 text-gray-500" />
                                    Reassess
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 transition-colors"
                                >
                                    {isSaving ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Report
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ReportSidebar;
