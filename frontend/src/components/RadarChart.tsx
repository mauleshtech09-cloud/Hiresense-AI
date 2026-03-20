import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SkillRadarChartProps {
    data: { skill: string; score: number }[];
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
    return (
        <div className="w-full h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">Skill Alignment</h4>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Candidate" dataKey="score" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillRadarChart;
