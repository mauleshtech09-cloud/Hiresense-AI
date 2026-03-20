import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building, Mail, Phone, User as UserIcon, LogOut, CheckCircle, BarChart, ShieldCheck, MapPin, Briefcase, Save } from 'lucide-react';

const Profile: React.FC = () => {
    const { org, logout, updateOrg } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        contactPerson: '',
        industry: '',
        location: ''
    });

    const handleEditClick = () => {
        if (org) {
            setEditForm({
                name: org.name,
                email: org.email,
                phone: org.phone,
                contactPerson: org.contactPerson,
                industry: org.industry || '',
                location: org.location || ''
            });
            setIsEditing(true);
            setSuccessMessage('');
        }
    };

    const handleSave = () => {
        updateOrg(editForm);
        setIsEditing(false);
        setSuccessMessage('Organization details updated successfully.');
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    if (!org) return null;

    const usagePercent = org.dailyLimit > 0 ? (org.scansUsedToday / org.dailyLimit) * 100 : 0;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden mt-4">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold text-4xl shrink-0">
                        {org.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">{org.name}</h1>
                        <p className="text-gray-500 text-lg mt-1">Username: @{org.username}</p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
                            <ShieldCheck className="w-5 h-5" />
                            {org.plan} Plan
                        </div>
                    </div>
                    <div className="shrink-0 flex gap-4">
                        {!isEditing ? (
                            <button onClick={handleEditClick} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
                                Edit Profile
                            </button>
                        ) : (
                            <button onClick={handleSave} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-md">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        )}
                        <button
                            onClick={logout}
                            className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{successMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Building className="w-6 h-6 text-indigo-500" />
                        Organization Details
                    </h2>
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                                <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full text-sm border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                                <input type="text" value={editForm.contactPerson} onChange={e => setEditForm({...editForm, contactPerson: e.target.value})} className="w-full text-sm border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full text-sm border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full text-sm border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Industry / Domain</label>
                                <input type="text" value={editForm.industry} onChange={e => setEditForm({...editForm, industry: e.target.value})} placeholder="e.g. Technology" className="w-full text-sm border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Location</label>
                                <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} placeholder="e.g. New York, USA" className="w-full text-sm border-gray-300 border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div className="pt-2 flex justify-end">
                                <button onClick={() => setIsEditing(false)} className="text-sm font-medium text-gray-500 hover:text-gray-700">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 text-sm">
                            <div>
                                <label className="block text-gray-500 font-medium mb-1 flex items-center gap-2">
                                    <Building className="w-4 h-4" /> Organization Name
                                </label>
                                <div className="font-semibold text-gray-900 text-base">{org.name}</div>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-medium mb-1 flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" /> Contact Person
                                </label>
                                <div className="font-semibold text-gray-900 text-base">{org.contactPerson}</div>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-medium mb-1 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email Address
                                </label>
                                <div className="font-semibold text-gray-900 text-base">{org.email}</div>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-medium mb-1 flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Phone Number
                                </label>
                                <div className="font-semibold text-gray-900 text-base">{org.phone}</div>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-medium mb-1 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Industry
                                </label>
                                <div className="font-semibold text-gray-900 text-base">{org.industry || 'Not specified'}</div>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-medium mb-1 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Location
                                </label>
                                <div className="font-semibold text-gray-900 text-base">{org.location || 'Not specified'}</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BarChart className="w-6 h-6 text-indigo-500" />
                        Usage & Limits
                    </h2>
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-bold text-gray-900">Daily Scans</span>
                                <span className="text-sm font-semibold text-gray-500">
                                    {org.scansUsedToday} / {org.dailyLimit}
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full transition-all ${usagePercent > 90 ? 'bg-red-500' : 'bg-indigo-500'}`}
                                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                ></div>
                            </div>
                            {usagePercent > 80 && (
                                <p className="mt-2 text-xs text-amber-600 font-medium">Approaching daily limit. Consider upgrading your plan.</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-bold text-gray-900">Reports Generated</span>
                                <span className="text-sm font-semibold text-gray-500">
                                    {org.reportsUsedToday} / {org.reportLimit}
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div
                                    className="bg-purple-500 h-3 rounded-full transition-all"
                                    style={{ width: `${Math.min((org.reportsUsedToday / org.reportLimit) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Current Plan Options</p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {org.plan === 'Basic' ? 'Limited filters unlocked.' : 'All advanced scanner filters activated.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
