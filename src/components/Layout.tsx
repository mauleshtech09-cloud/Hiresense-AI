import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const Layout: React.FC = () => {
    const { org } = useAuth();

    if (!org) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-[100vh] flex flex-col bg-[var(--color-secondary-50)]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
