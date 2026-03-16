import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Lock, Zap, Briefcase, MapPin, Search, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import type { CandidateReport, CandidateScore } from '../context/AppStateContext';
import ReportSidebar from '../components/ReportSidebar';
import { determineDomain } from '../utils/domainFramework';

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
    const [jobRole, setJobRole] = useState("Software Engineer");

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

    const generateReport = (isReassess: boolean = false) => {
        const jobDomainFramework = determineDomain(jobRole);
        const jobDomainName = jobDomainFramework ? jobDomainFramework.name : 'Unknown Domain';

        // Simulate resume content based on filename to prove mismatch logic
        const filename = file ? file.name.toLowerCase() : '';
        let candidateDomainName = 'Software Development'; // Default
        if (filename.includes('cyber') || filename.includes('soc') || filename.includes('security')) {
            candidateDomainName = 'Cybersecurity';
        } else if (filename.includes('design') || filename.includes('ui') || filename.includes('ux')) {
            candidateDomainName = 'UI / UX Design';
        } else if (filename.includes('backend') || filename.includes('dev')) {
            candidateDomainName = 'Software Development';
        }

        const isExactMatch = candidateDomainName === jobDomainName;

        const domainMatchStatus = isExactMatch ? 'Match' : 'Mismatch';
        
        const variationScore = isReassess ? Math.floor(Math.random() * 5 - 2) : 0;
        
        let baseScore = 0;
        let domainRelevance = 0;
        
        if (isExactMatch) {
            domainRelevance = 32 + variationScore; // ~32 out of 35
        } else {
            domainRelevance = 10 + Math.floor(Math.random() * 5); // Severe penalty
        }

        const skillMatch = isExactMatch ? 20 + Math.floor(Math.random() * 5) : 5 + Math.floor(Math.random() * 5); // out of 25
        const experienceMatch = isExactMatch ? 12 + Math.floor(Math.random() * 3) : 8; // out of 15
        const educationMatch = 8; // out of 10
        const certifications = isExactMatch ? 8 : 2; // out of 10
        const supportingSkills = 4; // out of 5

        baseScore = domainRelevance + skillMatch + experienceMatch + educationMatch + certifications + supportingSkills;

        const scoreBreakdown: CandidateScore = {
            total: baseScore,
            domainRelevance,
            skillMatch,
            experienceMatch,
            educationMatch,
            certifications,
            supportingSkills
        };

        const matchedSkills = isExactMatch && jobDomainFramework 
            ? jobDomainFramework.requiredSkills.slice(0, 5) 
            : ['Basic Communication', 'MS Office'];
            
        const missingCriticalSkills = isExactMatch && jobDomainFramework
            ? jobDomainFramework.requiredSkills.slice(5, 7)
            : jobDomainFramework ? jobDomainFramework.requiredSkills.slice(0, 4) : ['Core Domain Skills'];

        const criticalGaps = isExactMatch 
            ? ['Requires deeper architectural knowledge for senior tasks.']
            : ['Fundamental domain mismatch.', 'Lack of core technical foundation for this role.'];

        const report: CandidateReport = {
            id: Math.random().toString(36).substr(2, 9),
            candidateName: file ? file.name.replace('.pdf', '') : 'John Doe',
            date: new Date().toISOString().split('T')[0],
            jobRole: jobRole,
            score: baseScore,
            scoreBreakdown,
            
            topSkills: matchedSkills,
            strengths: isExactMatch ? ['Strong domain alignment', 'Good foundational skills'] : ['Translatable soft skills'],
            weaknesses: criticalGaps,
            
            candidateDomain: candidateDomainName,
            jobDomain: jobDomainName,
            domainMatchStatus,
            matchedSkills,
            missingCriticalSkills,
            experienceEvaluation: isExactMatch 
                ? 'Candidate has relevant years of experience aligning directly with core job requirements.'
                : 'Experience is heavily centered in a contrasting domain, making direct contribution difficult.',
            educationAlignment: 'Degree holds partial relevance to technical requirements.',
            criticalGaps,

            roleSuitability: isExactMatch 
                ? `Excellent candidate for ${jobRole}. Strong ${jobDomainName} ecosystem skills.`
                : `Candidate demonstrates strong knowledge in ${candidateDomainName}, but job requires ${jobDomainName}. Mismatch detected.`,
            
            recommendation: baseScore > 75 ? 'Highly Suitable' : baseScore > 60 ? 'Moderately Suitable' : baseScore > 40 ? 'Low Suitability' : 'Not Suitable'
        };

        return report;
    };

    const handleAnalyze = () => {
        if (!file) return;
        if (!incrementScan()) {
            alert("Daily scan limit reached for your plan!");
            return;
        }

        setIsAnalyzing(true);
        setScoreResult(null);
        setAnalysisStep(0);

        // Simulate steps
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setAnalysisStep(step);
            if (step >= analysisSteps.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsAnalyzing(false);
                    const report = generateReport();
                    setScoreResult(report);
                    setCurrentReport(report);
                }, 800);
            }
        }, 1200);
    };

    const handleReassess = () => {
        setScoreResult(null);
        setIsAnalyzing(true);
        setAnalysisStep(1); // skip initial parse step in UI
        setTimeout(() => {
            setIsAnalyzing(false);
            const report = generateReport(true);
            setScoreResult(report);
            setCurrentReport(report);
        }, 2000);
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
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Job Role</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input type="text" className="w-full text-sm border-gray-300 border rounded-lg pl-9 p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="e.g. Frontend Engineer" value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
                                </div>
                            </div>
                            <div>
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
                                    {['Skills Requirement', 'Salary Range', 'Experience Level', 'Education', 'Industry'].map((filter, i) => (
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
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={!file || isAnalyzing}
                            className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all"
                        >
                            {isAnalyzing ? 'Processing AI...' : 'Analyze Resume'}
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
                            <p className="text-gray-500 max-w-sm">Upload a resume and set your job filters to let AI analyze the candidate's fit.</p>
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
