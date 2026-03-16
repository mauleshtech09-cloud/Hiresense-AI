import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileSearch, Trophy, History, CreditCard, User, LogOut, Hexagon, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const location = useLocation();
    const { org, logout } = useAuth();
    const [isDark, setIsDark] = React.useState(() => document.documentElement.classList.contains('dark'));

    const toggleDark = () => {
        setIsDark(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return next;
        });
    };

    const links = [
        { name: 'Home', path: '/', icon: LayoutDashboard },
        { name: 'Scanner', path: '/scanner', icon: FileSearch },
        { name: 'Ranking', path: '/ranking', icon: Trophy },
        { name: 'History', path: '/history', icon: History },
        { name: 'Pricing', path: '/pricing', icon: CreditCard },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center gap-2 mr-4">
                            <div className="relative flex items-center justify-center">
                                <Hexagon className="h-8 w-8 text-indigo-600 fill-indigo-100" />
                                <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-md rounded-full"></div>
                            </div>
                            <span className="font-bold text-xl text-slate-900 tracking-tight">HireSense AI</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                            {links.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`${isActive
                                                ? 'border-indigo-500 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            } inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors`}
                                    >
                                        <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
                        <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
                            <span className="text-sm font-medium text-gray-700">{org?.name}</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-sm">
                                {org?.plan}
                            </span>
                        </div>
                        <Link
                            to="/profile"
                            className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        >
                            <User className="h-5 w-5" />
                        </Link>
                        <button
                            onClick={toggleDark}
                            className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all focus:outline-none"
                            title="Toggle Dark Mode"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={logout}
                            className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all focus:outline-none"
                            title="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
