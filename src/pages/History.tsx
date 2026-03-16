import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import type { CandidateReport } from '../context/AppStateContext';
import { History as HistoryIcon, Search, Calendar, Trash2, Eye, FileText } from 'lucide-react';
import ReportSidebar from '../components/ReportSidebar';
import { motion } from 'framer-motion';

const History: React.FC = () => {
    const { history, deleteReport } = useAppState();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReport, setSelectedReport] = useState<CandidateReport | null>(null);

    const filteredHistory = history.filter(report =>
        report.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <HistoryIcon className="w-6 h-6 text-indigo-600" />
                        Scan History
                    </h1>
                    <p className="text-gray-500 mt-1">Review previously saved candidate evaluations.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search candidates or roles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>

            {filteredHistory.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Reports Found</h3>
                    <p className="text-gray-500">You haven't saved any scan reports yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHistory.map((report, idx) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-50 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border border-indigo-100">
                                        {report.score}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 line-clamp-1" title={report.candidateName}>{report.candidateName}</h3>
                                        <p className="text-xs text-indigo-600 font-medium line-clamp-1">{report.jobRole}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 mb-4 line-clamp-2">
                                <span className="font-semibold text-gray-700">Top Skills:</span> {report.topSkills.join(', ')}
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {report.date}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => deleteReport(report.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                        title="Delete Report"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedReport(report)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded text-xs font-semibold transition-colors"
                                    >
                                        <Eye className="w-3 h-3" />
                                        View
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {selectedReport && (
                <ReportSidebar
                    isOpen={!!selectedReport}
                    onClose={() => setSelectedReport(null)}
                    report={selectedReport}
                    onReassess={() => {
                        // Placeholder: Reassess from history isn't practical without the original file. 
                        alert('Reassessing from history requires the original resume file on the Scanner page.');
                    }}
                />
            )}
        </div>
    );
};

export default History;
