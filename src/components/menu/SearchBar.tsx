import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value);

  // Keep refs in sync with props
  useEffect(() => {
    onChangeRef.current = onChange;
    valueRef.current = value;
  }, [onChange, value]);

  // Sync state if value is reset from outside (e.g. EmptyState reset button)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced search - only trigger when user actually types (localValue changes)
  // and do not trigger if the value matches the current query from parent.
  useEffect(() => {
    if (localValue === valueRef.current) return;

    const timer = setTimeout(() => {
      onChangeRef.current(localValue);
    }, 250);

    return () => clearTimeout(timer);
  }, [localValue]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-10 px-4">
      <div className="relative flex items-center bg-white/20 backdrop-blur-xl border border-charcoal/10 rounded-full shadow-executive-glow overflow-hidden transition-all duration-300 focus-within:border-matcha focus-within:ring-2 focus-within:ring-matcha/20">
        <div className="pl-6 text-charcoal/40">
          <svg
            className="w-5 h-5 transition-colors duration-300 group-focus-within:text-matcha"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Cari makanan atau minuman favoritmu..."
          className="w-full py-4 pl-4 pr-12 bg-transparent text-charcoal placeholder-charcoal/40 font-sans text-sm md:text-base border-none outline-none focus:ring-0"
        />
        {localValue && (
          <button
            onClick={() => {
              setLocalValue('');
              onChange('');
            }}
            className="absolute right-4 p-1 rounded-full text-charcoal/40 hover:text-charcoal hover:bg-charcoal/10 transition-all"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
