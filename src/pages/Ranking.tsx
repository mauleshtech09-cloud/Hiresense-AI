import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { Trophy, Medal, Award, TrendingUp, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Ranking: React.FC = () => {
    const { history } = useAppState();

    // Sort history by score descending
    const sortedCandidates = [...history].sort((a, b) => b.score - a.score);

    if (sortedCandidates.length === 0) {
        return (
            <div className="max-w-5xl mx-auto py-12 text-center bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Candidates Evaluated Yet</h2>
                <p className="text-gray-500">Scan resumes to build your candidate leaderboard.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Candidate Ranking</h1>
                    <p className="text-gray-500 mt-1">Leaderboard of all evaluated candidates across roles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-bold flex items-center">
                        <BarChart2 className="w-5 h-5 mr-2" />
                        Top 10% Highlighted
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Top Skills</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedCandidates.map((candidate, idx) => {
                            const isTop = idx < 3;
                            return (
                                <motion.tr
                                    key={candidate.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-bold text-gray-700">
                                            {idx === 0 ? <Trophy className="w-5 h-5 text-yellow-500" /> :
                                                idx === 1 ? <Medal className="w-5 h-5 text-gray-400" /> :
                                                    idx === 2 ? <Award className="w-5 h-5 text-amber-600" /> :
                                                        `#${idx + 1}`}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                                                {candidate.candidateName.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{candidate.candidateName}</div>
                                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                    {isTop ? 'Top Candidate' : 'Evaluated'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-wrap gap-1">
                                            {candidate.topSkills.slice(0, 3).map((skill, i) => (
                                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                    {skill}
                                                </span>
                                            ))}
                                            {candidate.topSkills.length > 3 && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                                    +{candidate.topSkills.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">
                                        {candidate.jobRole}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className={`text-lg font-extrabold ${candidate.score > 80 ? 'text-green-600' : candidate.score > 60 ? 'text-amber-500' : 'text-gray-900'}`}>{candidate.score}</span>
                                            <div className="w-24 ml-3 bg-gray-200 rounded-full h-2">
                                                <div className={`h-2 rounded-full ${candidate.score > 80 ? 'bg-green-500' : candidate.score > 60 ? 'bg-amber-400' : 'bg-indigo-600'}`} style={{ width: `${candidate.score}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ranking;
