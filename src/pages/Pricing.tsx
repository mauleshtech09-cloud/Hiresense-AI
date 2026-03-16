import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
    const { org } = useAuth();

    const plans = [
        {
            name: 'Basic',
            price: '₹100',
            description: 'Perfect for small teams starting with AI hiring.',
            features: ['3 Scans per day', '1 Detailed report', 'Basic Job Filters', 'Standard support'],
            notIncluded: ['Candidate Ranking', 'AI Interview Questions', 'Priority Processing'],
            highlight: false
        },
        {
            name: 'Intermediate',
            price: '₹500',
            description: 'For growing companies with consistent hiring needs.',
            features: ['20 Scans per day', '10 Detailed reports', 'All Job Filters Unlocked', 'Candidate Ranking', 'Standard support'],
            notIncluded: ['AI Interview Questions', 'Priority Processing'],
            highlight: false
        },
        {
            name: 'Pro',
            price: '₹1000',
            description: 'The optimal suite for dedicated recruitment teams.',
            features: ['100 Scans per day', '100 Detailed reports', 'All Filters Unlocked', 'Candidate Ranking', 'AI Interview Questions'],
            notIncluded: ['Priority Processing'],
            highlight: true
        },
        {
            name: 'Master',
            price: '₹5000',
            description: 'Unlimited AI power for enterprise organizations.',
            features: ['500 Scans per day', 'Unlimited Reports', 'All Filters Unlocked', 'Candidate Ranking', 'AI Interview Questions', 'Priority Processing (Fastest)'],
            notIncluded: [],
            highlight: false
        }
    ];

    return (
        <div className="pb-16 pt-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Pricing Plans</h1>
                <p className="text-xl text-gray-500">Choose the perfect AI screening capacity for your hiring volume.</p>
                {org && (
                    <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm">
                        You are currently on the <span className="underline decoration-2 underline-offset-4 ml-1">{org.plan}</span> plan.
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative flex flex-col p-8 rounded-3xl ${plan.highlight ? 'bg-indigo-600 text-white shadow-2xl scale-105 z-10' : 'bg-white border border-gray-200 shadow-sm hover:shadow-xl'} transition-all`}
                    >
                        {plan.highlight && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className={`text-2xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                            <p className={`mt-2 text-sm ${plan.highlight ? 'text-indigo-100' : 'text-gray-500'}`}>{plan.description}</p>
                        </div>

                        <div className="mb-6 flex items-baseline">
                            <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                            <span className={`text-sm ml-2 font-medium ${plan.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>/month</span>
                        </div>

                        <button
                            className={`mb-8 w-full py-3 px-4 rounded-xl font-bold transition-transform hover:-translate-y-0.5 ${plan.highlight ? 'bg-white text-indigo-600 shadow-md hover:bg-gray-50' : org?.plan === plan.name ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
                            disabled={org?.plan === plan.name}
                        >
                            {org?.plan === plan.name ? 'Current Plan' : 'Select Plan'}
                        </button>

                        <div className="flex-1">
                            <ul className="space-y-4">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start">
                                        <Check className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? 'text-indigo-300' : 'text-green-500'}`} />
                                        <span className={`text-sm ${plan.highlight ? 'text-indigo-50 font-medium' : 'text-gray-600'}`}>{feature}</span>
                                    </li>
                                ))}
                                {plan.notIncluded.map(feature => (
                                    <li key={feature} className="flex items-start opacity-50">
                                        <X className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? 'text-indigo-300' : 'text-gray-400'}`} />
                                        <span className={`text-sm ${plan.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
