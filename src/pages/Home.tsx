import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowRight, FileSearch, ShieldCheck, Zap,
    Target, BarChart, Clock, Users, XCircle, CheckCircle, Upload, Search, FileText
} from 'lucide-react';

const Home: React.FC = () => {
    const { org } = useAuth();

    return (
        <div className="flex flex-col gap-24 pb-20">

            {/* HERO SECTION */}
            <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-xl mt-4">
                <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-indigo-50 to-white pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
                    >
                        Automated Resume <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Scanning & Matching
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-8"
                    >
                        Streamline your recruitment process and identify the best candidates instantly with our smart scanner.
                    </motion.p>

                    {/* NEW PLAN INDICATOR */}
                    {org && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="flex justify-center mb-10"
                        >
                            <div className="relative group cursor-pointer inline-block">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                <div className="relative flex items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-center p-2 bg-indigo-50 rounded-lg mr-4">
                                        <ShieldCheck className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">Current Plan</div>
                                        <div className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                                            {org.plan}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/scanner" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5">
                            Start Resume Scan
                            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                        </Link>
                        <Link to="/pricing" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 md:text-lg transition-all hover:-translate-y-0.5">
                            View Pricing
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">The Hiring Challenge</h2>
                    <p className="mt-4 text-lg text-gray-600">Traditional recruitment is broken.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'High Volume', desc: 'Recruiters drown in hundreds of unqualified resumes.', icon: Users },
                        { title: 'Manual Delays', desc: 'Screening takes days, causing top talent to drop off.', icon: Clock },
                        { title: 'Inconsistent Decisions', desc: 'Human bias leads to inconsistent candidate ranking.', icon: XCircle }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-6 text-red-500">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="bg-white rounded-3xl p-8 md:p-16 border border-gray-100 shadow-sm max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10" />
                    {[
                        { step: '01', title: 'Upload Resume', desc: 'Securely upload candidate resumes in PDF format.', icon: Upload },
                        { step: '02', title: 'Apply Job Filters', desc: 'Define your role, skills, and experience requirements.', icon: Search },
                        { step: '03', title: 'Smart Matching', desc: 'Get instant structured reports and candidate scores.', icon: FileText }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center relative z-10 bg-white group">
                            <div className="w-24 h-24 rounded-full bg-indigo-50 border-8 border-white flex items-center justify-center mb-6 text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Step {item.step}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 px-4">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">The Hiring Advantage</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: 'Resume Parsing', icon: FileSearch },
                        { title: 'Candidate Skill Matching', icon: Target },
                        { title: 'Skill Gap Detection', icon: Zap },
                        { title: 'Automated Candidate Ranking', icon: BarChart },
                        { title: 'Recommendation Engine', icon: ShieldCheck },
                        { title: 'Structured Candidate Reports', icon: FileText }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 group"
                        >
                            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* IMPACT METRICS */}
            <section className="bg-indigo-900 rounded-3xl text-white p-8 md:p-16 max-w-7xl mx-auto w-full overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen opacity-20 filter blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { val: '60%', label: 'Faster Hiring' },
                        { val: '85%', label: 'Less Screening Effort' },
                        { val: '40%', label: 'Lower Recruitment Cost' },
                        { val: '10x', label: 'Better Candidate Quality' }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-indigo-200 mb-2">{stat.val}</div>
                            <div className="text-sm md:text-base font-medium text-indigo-100 opacity-80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Why HireSense?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">❌</span>
                            Traditional Tools
                        </h3>
                        <ul className="space-y-4">
                            {['Manual screening', 'Basic keyword matching', 'No candidate ranking', 'No structured reports'].map((item, i) => (
                                <li key={i} className="flex items-start text-gray-600">
                                    <XCircle className="w-5 h-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-5 rounded-bl-[100px]" />
                        <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-3 relative z-10">
                            <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm">✓</span>
                            HireSense
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            {['Smart-driven evaluation', 'Candidate ranking system', 'Skill gap analysis', 'Detailed hiring insights'].map((item, i) => (
                                <li key={i} className="flex items-start text-indigo-900 font-medium">
                                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;