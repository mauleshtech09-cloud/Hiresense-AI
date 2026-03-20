import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Loader2, X, Sparkles, Lock } from 'lucide-react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

interface LightComboboxProps<T> {
  icon: React.ReactNode;
  placeholder: string;
  items: T[];
  loading: boolean;
  disabled: boolean;
  value: T | null;
  onSelect: (item: T | null) => void;
  displayKey: keyof T;
  onSearch: (query: string) => void;
}

export function LightCombobox<T extends { id: string }>({
  icon,
  placeholder,
  items,
  loading,
  disabled,
  value,
  onSelect,
  displayKey,
  onSearch
}: LightComboboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (value) setQuery(String(value[displayKey]));
    else setQuery('');
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
      onSelect(null);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
          {icon}
        </div>
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
          className={`w-full text-sm border-gray-300 border rounded-lg pl-9 pr-8 p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
          ) : value && !disabled ? (
            <X 
              className="w-4 h-4 cursor-pointer hover:text-gray-700 transition-colors" 
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
      
      <AnimatePresence>
        {isOpen && !disabled && (items.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto"
          >
            {loading && items.length === 0 ? (
              <div className="p-3 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Searching...
              </div>
            ) : items.length === 0 ? (
              <div className="p-3 text-center text-gray-500 text-sm">
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
                    className={`px-3 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between hover:bg-indigo-50 ${value?.id === item.id ? 'bg-indigo-100 text-indigo-800 font-medium' : 'text-gray-700'}`}
                  >
                    <span>{String(item[displayKey])}</span>
                    {value?.id === item.id && <Check className="w-4 h-4 text-indigo-600" />}
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

interface LightMultiSelectComboboxProps<T> {
  items: T[];
  loading: boolean;
  disabled: boolean;
  selectedIds: string[];
  onToggle: (id: string, item: T) => void;
  displayKey: keyof T;
  onSearch: (query: string) => void;
  placeholder: string;
}

export function LightMultiSelectCombobox<T extends { id: string, tier?: string }>({
  items,
  loading,
  disabled,
  selectedIds,
  onToggle,
  displayKey,
  onSearch,
  placeholder
}: LightMultiSelectComboboxProps<T>) {
  const [query, setQuery] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full text-sm border-gray-300 border rounded-lg pl-9 pr-4 p-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-indigo-500" /> : <Sparkles className="w-4 h-4" />}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1 border-gray-100 min-h-[30px]">
        {selectedIds.length === 0 && !query && (
            <p className="text-gray-400 text-xs italic">No skills selected.</p>
        )}
        {items.map(item => {
          const isSelected = selectedIds.includes(item.id);
          if (!isSelected && (query === '' || items.length === 0)) return null; // Only show unselected if searching
          
          const isGold = item.tier === 'pro' || item.tier === 'master';
          
          return (
            <button
              key={item.id}
              onClick={() => !disabled && onToggle(item.id, item)}
              disabled={disabled}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 border ${
                isSelected 
                  ? isGold 
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : "bg-indigo-100 border-indigo-300 text-indigo-800"
                  : disabled ? "bg-gray-100 border-gray-200 text-gray-400 opacity-50" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              {String(item[displayKey])}
              {item.tier === 'master' && <Lock className="w-3 h-3 text-amber-500 ml-1" />}
              {isSelected && <X className="w-3 h-3 ml-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
