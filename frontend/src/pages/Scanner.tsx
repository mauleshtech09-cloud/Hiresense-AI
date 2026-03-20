import React, { useState } from 'react';
import taxonomyData from '../data/taxonomy.json';
import { motion } from 'framer-motion';
import { Upload, File, Lock, Zap, Briefcase, MapPin, Search, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import type { CandidateReport } from '../context/AppStateContext';
import ReportSidebar from '../components/ReportSidebar';
import { resumeService } from '../services/resumeService';

// Simulate parsing and scoring
const analysisSteps = [
    "Parsing resume document...",
    "Extracting candidate skills and experience...",
    "Comparing with job requirements...",
    "Calculating candidate score..."
];

const Scanner: React.FC = () => {
    const { org, incrementScan } = useAuth();
    const { setCurrentReport } = useAppState();

    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    const [scoreResult, setScoreResult] = useState<CandidateReport | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [scanError, setScanError] = useState<string | null>(null);

    const isBasic = org?.plan === 'Basic';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => e.preventDefault();

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;
        if (!incrementScan()) {
            alert("Daily scan limit reached for your plan!");
            return;
        }

        setIsAnalyzing(true);
        setScoreResult(null);
        setAnalysisStep(0);

        // Simulate steps visually while awaiting
        let step = 0;
        const interval = setInterval(() => {
            if (step < analysisSteps.length - 1) {
                step++;
                setAnalysisStep(step);
            }
        }, 800);

        try {
            const report = await resumeService.analyze(file, selectedRole, false);
            clearInterval(interval);
            setAnalysisStep(analysisSteps.length);
            setTimeout(() => {
                setIsAnalyzing(false);
                setScoreResult(report);
                setCurrentReport(report);
            }, 800);
        } catch (error: any) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setScanError(error.message || "Failed to analyze resume.");
        }
    };

    const handleReassess = async () => {
        if (!file) return;
        setScoreResult(null);
        setIsAnalyzing(true);
        setAnalysisStep(1); // skip initial parse step in UI
        try {
            const report = await resumeService.analyze(file, selectedRole, true);
            setIsAnalyzing(false);
            setScoreResult(report);
            setCurrentReport(report);
        } catch (error: any) {
            setIsAnalyzing(false);
            setScanError(error.message || "Failed to reassess resume.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">

            <div className="flex flex-col md:flex-row gap-8">
                {/* LEFT COLUMN - Upload & Filters */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">1</span>
                            Upload Resume
                        </h2>

                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${file ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300 bg-gray-50'}`}
                        >
                            <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                                {file ? (
                                    <>
                                        <File className="w-12 h-12 text-indigo-500 mb-3" />
                                        <span className="text-sm font-semibold text-gray-900">{file.name}</span>
                                        <span className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                        <span className="text-sm font-medium text-gray-700">Drag & drop your PDF here</span>
                                        <span className="text-xs text-gray-500 mt-1">or click to browse</span>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">2</span>
                            Job Filters
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Industry</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <select
                                        className="w-full text-sm border-gray-300 border rounded-lg pl-9 p-2 focus:ring-2 focus:ring-indigo-500 appearance-none bg-white outline-none cursor-pointer"
                                        value={selectedIndustry}
                                        onChange={(e) => {
                                            setSelectedIndustry(e.target.value);
                                            setSelectedRole('');
                                        }}
                                    >
                                        <option value="" disabled>Select Industry</option>
                                        {taxonomyData.industries.map(ind => (
                                            <option key={ind.id} value={ind.id}>{ind.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            {selectedIndustry && (
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Job Role</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <select
                                            className="w-full text-sm border-gray-300 border rounded-lg pl-9 p-2 focus:ring-2 focus:ring-indigo-500 appearance-none bg-white outline-none cursor-pointer"
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                        >
                                            <option value="" disabled>Select Role</option>
                                            {taxonomyData.industries.find(i => i.id === selectedIndustry)?.roles.map(r => (
                                                <option key={r.title} value={r.title}>{r.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {selectedRole && (
                                <>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Relevant Skills</label>
                                        <div className="flex flex-wrap gap-2 mt-1 mb-2">
                                            {taxonomyData.industries.find(i => i.id === selectedIndustry)?.roles.find(r => r.title === selectedRole)?.skills.map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <input type="text" className="w-full text-sm border-gray-300 border rounded-lg pl-9 p-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="City, Country" />
                                        </div>
                                    </div>

                                    {/* Locked Filters for Basic */}
                                    <div className="sm:col-span-2 mt-2 pt-4 border-t border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            Advanced Filters
                                            {isBasic && <span className="ml-2 text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center"><Lock className="w-3 h-3 mr-1" /> Pro required</span>}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {['Salary Range', 'Experience Level', 'Education'].map((filter, i) => (
                                                <div key={i} className="relative">
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{filter}</label>
                                                    <input
                                                        type="text"
                                                        disabled={isBasic}
                                                        className={`w-full text-sm border border-gray-300 rounded-lg p-2 ${isBasic ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'focus:ring-2 focus:ring-indigo-500 outline-none'}`}
                                                        placeholder="Any"
                                                    />
                                                    {isBasic && <Lock className="absolute right-3 top-7 w-4 h-4 text-gray-400" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={!file || !selectedIndustry || !selectedRole || isAnalyzing}
                            className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all"
                        >
                            {isAnalyzing ? 'Processing...' : 'Analyze Resume'}
                            <Zap className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN - Results & AI Engine */}
                <div className="w-full md:w-1/2">
                    {(!isAnalyzing && !scoreResult) && (
                        <div className="h-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                            <Search className="w-16 h-16 text-indigo-100 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Scan</h3>
                            <p className="text-gray-500 max-w-sm">Upload a resume and set your job filters to let our scanner analyze the candidate's fit.</p>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="h-full bg-indigo-900 p-8 rounded-2xl shadow-lg border border-indigo-200 flex flex-col justify-center min-h-[400px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMi0yIiBzdHJva2U9IiM5YzlhZmIiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
                            <div className="relative z-10 space-y-6 max-w-sm mx-auto w-full">
                                <div className="flex justify-center mb-8">
                                    <div className="w-16 h-16 border-4 border-indigo-400 border-t-white rounded-full animate-spin"></div>
                                </div>
                                {analysisSteps.map((text, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: analysisStep >= i ? 1 : 0.2, x: 0 }}
                                        className="flex items-center text-sm font-medium text-white"
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${analysisStep > i ? 'bg-green-500' : analysisStep === i ? 'bg-indigo-500 animate-pulse' : 'bg-indigo-900/50 border border-indigo-500'}`}>
                                            {analysisStep > i && <CheckCircle className="w-4 h-4 text-white" />}
                                        </div>
                                        {text}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {scoreResult && !isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-indigo-100 flex flex-col min-h-[400px]"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
                                <p className="text-gray-500 mt-1">Match score out of 100</p>
                            </div>

                            <div className="flex justify-center mb-8">
                                <div className="relative w-40 h-40">
                                    {/* Ring visualization */}
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                                        <motion.circle
                                            initial={{ strokeDasharray: "0 440" }}
                                            animate={{ strokeDasharray: `${(scoreResult.score / 100) * 440} 440` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent"
                                            strokeLinecap="round"
                                            className={scoreResult.score > 75 ? 'text-green-500' : scoreResult.score > 50 ? 'text-amber-500' : 'text-red-500'}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-extrabold text-gray-900">{scoreResult.score}</span>
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Score</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="text-xs text-gray-500 font-semibold uppercase">Domain Fit</div>
                                    <div className={`text-lg font-bold ${scoreResult.scoreBreakdown.domainRelevance > 25 ? 'text-indigo-700' : 'text-red-500'}`}>
                                        {scoreResult.scoreBreakdown.domainRelevance} / 35
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="text-xs text-gray-500 font-semibold uppercase">Skill Match</div>
                                    <div className="text-lg font-bold text-indigo-700">{scoreResult.scoreBreakdown.skillMatch} / 25</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 col-span-2">
                                    <div className="text-xs text-gray-500 font-semibold uppercase">Recommendation</div>
                                    <div className="text-sm font-bold text-gray-800 mt-1 truncate">{scoreResult.recommendation}</div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="mt-auto w-full py-3 px-4 border border-indigo-600 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                            >
                                View Detailed Report
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {scanError && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#1a1a1a] border border-red-500/50 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4"
                    >
                        <h3 className="text-lg font-bold text-red-400 mb-2">Analysis Failed</h3>
                        <p className="text-gray-200 text-sm mb-6 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">{scanError}</p>
                        <button
                            onClick={() => setScanError(null)}
                            className="w-full py-2 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold transition-all"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                </div>
            )}

            <ReportSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                report={scoreResult}
                onReassess={handleReassess}
            />
        </div>
    );
};

export default Scanner;
