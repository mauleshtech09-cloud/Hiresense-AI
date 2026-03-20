import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, GraduationCap, Award, ChevronRight, Star, Sparkles, Target } from 'lucide-react';
import { DOMAIN_FRAMEWORKS } from '../utils/domainFramework';

const FindSkill: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    // Flatten all roles for suggestions
    const allRoles = useMemo(() => {
        const roles: string[] = [];
        Object.values(DOMAIN_FRAMEWORKS).forEach(domain => {
            domain.roles.forEach(role => {
                if (!roles.includes(role)) roles.push(role);
            });
        });
        return roles;
    }, []);

    // Filter roles based on search query
    const suggestions = useMemo(() => {
        if (!searchQuery) return allRoles.slice(0, 8);
        return allRoles.filter(role => 
            role.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 8);
    }, [searchQuery, allRoles]);

    const selectedDomain = useMemo(() => {
        if (!selectedRole) return null;
        return Object.values(DOMAIN_FRAMEWORKS).find(domain => 
            domain.roles.includes(selectedRole)
        ) || null;
    }, [selectedRole]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            setSelectedRole(suggestions[0]);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Hero Section */}
            <section className="text-center space-y-6 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm mb-4"
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-semibold tracking-wide uppercase">Skill Discovery Engine</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
                >
                    Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Perfect Skills</span><br />
                    for Your Dream Role
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 max-w-2xl mx-auto text-lg"
                >
                    Search any job designation to uncover the core competencies, qualifications, 
                    and certifications required by top employers today.
                </motion.p>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mx-auto mt-10 relative"
                >
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
                            <Search className="h-6 w-6 text-indigo-500" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-12 pr-4 py-5 bg-white border-2 border-gray-100 rounded-2xl shadow-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all outline-none text-lg text-slate-800 placeholder:text-gray-400"
                            placeholder="Search e.g. Frontend Developer, Data Scientist..."
                        />
                        <button 
                            type="submit"
                            className="absolute right-3 top-2.5 bottom-2.5 px-6 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
                        >
                            Explore
                        </button>
                    </form>

                    {/* Suggestions */}
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <span className="text-sm font-medium text-gray-400 py-2">Try:</span>
                        {suggestions.map((role) => (
                            <button
                                key={role}
                                onClick={() => {
                                    setSelectedRole(role);
                                    setSearchQuery(role);
                                }}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                                    selectedRole === role 
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                                    : 'bg-white text-gray-600 border-gray-100 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Results Section */}
            <AnimatePresence mode="wait">
                {selectedDomain ? (
                    <motion.div
                        key={selectedRole}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        className="space-y-8"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">{selectedRole}</h2>
                                <p className="text-indigo-600 font-medium flex items-center gap-2 mt-1">
                                    <Target className="w-4 h-4" />
                                    {selectedDomain.name} Industry
                                </p>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase">Demand</p>
                                    <div className="flex gap-1 mt-1 text-amber-400">
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        <Star className="w-4 h-4 text-gray-200" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Skills Column */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Core Technical Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedDomain.requiredSkills.map((skill, index) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100 hover:bg-blue-100 cursor-default transition-colors"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Supporting Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedDomain.supportingSkills.map((skill, index) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-bold border border-purple-100 hover:bg-purple-100 cursor-default transition-colors"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">Education</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {selectedDomain.education.map((edu) => (
                                            <li key={edu} className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                                                <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                {edu}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">Certifications</h3>
                                    </div>
                                    {selectedDomain.certifications.length > 0 ? (
                                        <ul className="space-y-3">
                                            {selectedDomain.certifications.map((cert) => (
                                                <li key={cert} className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                                                    <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                                    {cert}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No specific certifications listed</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200"
                    >
                        <div className="max-w-xs mx-auto space-y-4">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto">
                                <Search className="w-10 h-10 text-gray-200" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-400">Select a designation to see its profile</h3>
                            <p className="text-sm text-gray-400">Choose from the suggestions above or search for a specific role.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FindSkill;
