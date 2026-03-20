"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Briefcase, Sparkles, Check, ChevronDown, Loader2, X, Lock } from 'lucide-react';
import { cn } from '../utils/cn';
import {
  type Industry,
  type JobRole,
  type Skill,
  fetchIndustries,
  fetchRolesByIndustry,
  fetchSkillsByRole
} from '../lib/taxonomy';

// custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Combobox Component
interface ComboboxProps<T> {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  items: T[];
  loading: boolean;
  disabled: boolean;
  value: T | null;
  onSelect: (item: T | null) => void;
  displayKey: keyof T;
  onSearch: (query: string) => void;
  error?: string;
  highlightSelected?: boolean;
}

function Combobox<T extends { id: string }>({
  label,
  icon,
  placeholder,
  items,
  loading,
  disabled,
  value,
  onSelect,
  displayKey,
  onSearch,
  error,
  highlightSelected
}: ComboboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Update query when value changes
  useEffect(() => {
    if (value) {
      setQuery(String(value[displayKey]));
    } else {
      setQuery('');
    }
  }, [value, displayKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (value) setQuery(String(value[displayKey]));
        else setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, displayKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    onSearch(e.target.value);
    if (value && e.target.value !== String(value[displayKey])) {
      onSelect(null); // Clear selection if user types something else
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            onSearch(query);
          }}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full bg-slate-800/50 border backdrop-blur-md rounded-xl py-3 pl-4 pr-10 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all",
            disabled ? "opacity-50 cursor-not-allowed border-slate-700/30" : "border-slate-700/50 hover:border-slate-600/50",
            highlightSelected && value ? "border-blue-500/50 bg-blue-500/5" : "",
            error ? "border-red-500/50 focus:ring-red-500/50" : ""
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          ) : value ? (
            <X 
              className="w-4 h-4 cursor-pointer hover:text-slate-200 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(null);
                setQuery('');
                onSearch('');
              }} 
            />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>
      
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

      <AnimatePresence>
        {isOpen && !disabled && (items.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
          >
            {loading && items.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Fetching...
              </div>
            ) : items.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-sm">
                No results found.
              </div>
            ) : (
              <ul className="py-1">
                {items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      onSelect(item);
                      setQuery(String(item[displayKey]));
                      setIsOpen(false);
                    }}
                    className={cn(
                      "px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between group text-slate-200",
                      value?.id === item.id ? "bg-blue-500/20 text-blue-100" : "hover:bg-slate-700/50"
                    )}
                  >
                    <span>{String(item[displayKey])}</span>
                    {value?.id === item.id && <Check className="w-4 h-4 text-blue-400" />}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// MultiSelect Combobox for Skills
interface MultiSelectComboboxProps<T> {
  items: T[];
  loading: boolean;
  selectedIds: string[];
  onToggle: (id: string, item: T) => void;
  displayKey: keyof T;
  onSearch: (query: string) => void;
}

function MultiSelectCombobox<T extends { id: string, type?: string, tier?: string }>({
  items,
  loading,
  selectedIds,
  onToggle,
  displayKey,
  onSearch
}: MultiSelectComboboxProps<T>) {
  const [query, setQuery] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search required skills..."
          className="w-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md rounded-xl py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.length === 0 && !loading && (
          <p className="text-slate-500 text-sm py-2">No skills found matching your search.</p>
        )}
        
        {items.map(item => {
          const isSelected = selectedIds.includes(item.id);
          const isGold = item.tier === 'pro' || item.tier === 'master';
          
          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id, item)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 border",
                isSelected 
                  ? isGold 
                    ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50 text-yellow-200"
                    : "bg-blue-500/20 border-blue-500/50 text-blue-200"
                  : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
              )}
            >
              {String(item[displayKey])}
              {item.tier === 'master' && <Lock className="w-3 h-3 text-yellow-500 ml-1" />}
              {isSelected && <X className="w-3 h-3 ml-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}


export default function JobFilters() {
  // State 1: Industry
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [industrySearch, setIndustrySearch] = useState('');
  const debouncedIndustrySearch = useDebounce(industrySearch, 300);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(false);
  const [industryError, setIndustryError] = useState('');

  // State 2: Role
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [roleSearch, setRoleSearch] = useState('');
  const debouncedRoleSearch = useDebounce(roleSearch, 300);
  const [roles, setRoles] = useState<JobRole[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [roleError, setRoleError] = useState('');

  // State 3: Skills
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [skillSearch, setSkillSearch] = useState('');
  const debouncedSkillSearch = useDebounce(skillSearch, 300);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [skillError, setSkillError] = useState('');

  // Cascading resets
  useEffect(() => {
    setSelectedRole(null);
    setRoleSearch('');
    setSelectedSkills([]);
    setSkillSearch('');
    setRoles([]);
    setSkills([]);
  }, [selectedIndustry?.id]);

  useEffect(() => {
    setSelectedSkills([]);
    setSkillSearch('');
    setSkills([]);
  }, [selectedRole?.id]);

  // Fetch Industries
  useEffect(() => {
    let active = true;
    const loadIndustries = async () => {
      setIsLoadingIndustries(true);
      setIndustryError('');
      try {
        const data = await fetchIndustries(debouncedIndustrySearch);
        if (active) setIndustries(data);
      } catch (err: any) {
        if (active) setIndustryError(err.message);
      } finally {
        if (active) setIsLoadingIndustries(false);
      }
    };
    loadIndustries();
    return () => { active = false; };
  }, [debouncedIndustrySearch]);

  // Fetch Roles
  useEffect(() => {
    if (!selectedIndustry) return;
    let active = true;
    const loadRoles = async () => {
      setIsLoadingRoles(true);
      setRoleError('');
      try {
        const data = await fetchRolesByIndustry(selectedIndustry.id, debouncedRoleSearch);
        if (active) setRoles(data);
      } catch (err: any) {
        if (active) setRoleError(err.message);
      } finally {
        if (active) setIsLoadingRoles(false);
      }
    };
    loadRoles();
    return () => { active = false; };
  }, [selectedIndustry, debouncedRoleSearch]);

  // Fetch Skills
  useEffect(() => {
    if (!selectedRole) return;
    let active = true;
    const loadSkills = async () => {
      setIsLoadingSkills(true);
      setSkillError('');
      try {
        const data = await fetchSkillsByRole(selectedRole.id, debouncedSkillSearch);
        if (active) setSkills(data);
      } catch (err: any) {
        if (active) setSkillError(err.message);
      } finally {
        if (active) setIsLoadingSkills(false);
      }
    };
    loadSkills();
    return () => { active = false; };
  }, [selectedRole, debouncedSkillSearch]);

  const toggleSkill = (id: string, skill: Skill) => {
    setSelectedSkills(prev => 
      prev.some(s => s.id === id) ? prev.filter(s => s.id !== id) : [...prev, skill]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-[#1E293B]/40 backdrop-blur-md border border-slate-700/50 shadow-2xl font-sans text-slate-200">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent inline-flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-400" />
          HireSense AI Engine
        </h2>
        <p className="text-slate-400 mt-2">Configure the job taxonomy to calibrate the candidate scoring model.</p>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
          {/* Step 1: Industry */}
          <Combobox<Industry>
            label="1. Industry Domain"
            icon={<Building2 className="w-4 h-4 text-blue-400" />}
            placeholder="Search SOC Industries..."
            items={industries}
            loading={isLoadingIndustries}
            disabled={false}
            value={selectedIndustry}
            onSelect={setSelectedIndustry}
            displayKey="name"
            onSearch={setIndustrySearch}
            error={industryError}
            highlightSelected={!!selectedIndustry}
          />

          {/* Step 2: Role */}
          <Combobox<JobRole>
            label="2. Contextual Job Role"
            icon={<Briefcase className="w-4 h-4 text-indigo-400" />}
            placeholder="Search roles in domain..."
            items={roles}
            loading={isLoadingRoles}
            disabled={!selectedIndustry}
            value={selectedRole}
            onSelect={setSelectedRole}
            displayKey="name"
            onSearch={setRoleSearch}
            error={roleError}
            highlightSelected={!!selectedRole}
          />
        </div>

        {/* Algorithm Weight Visualizer */}
        <AnimatePresence>
          {selectedIndustry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">Domain Calibration Locked</h4>
                    <p className="text-xs text-slate-400">SOC Group: {selectedIndustry.socCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">35%</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Weight Locked</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Advanced Filters (Skills) */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 pt-8 border-t border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-200">3. Advanced Skill Filters</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30">
                  Pro Engine Enabled
                </span>
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                {skillError ? (
                  <p className="text-red-400 text-sm">{skillError}</p>
                ) : (
                  <MultiSelectCombobox<Skill>
                    items={skills}
                    loading={isLoadingSkills}
                    selectedIds={selectedSkills.map(s => s.id)}
                    onToggle={toggleSkill}
                    displayKey="name"
                    onSearch={setSkillSearch}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
