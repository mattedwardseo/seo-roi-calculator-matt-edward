import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  info?: string;
  max?: number;
  prefix?: string;
}

export function InputField({ label, value, onChange, info, max = 1000000, prefix }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {info && (
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
              {info}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{prefix}</span>
          </div>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = Math.min(Math.max(0, Number(e.target.value)), max);
            onChange(newValue);
          }}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
            ${prefix ? 'pl-7' : 'pl-3'} pr-3 py-2 border`}
          min="0"
          max={max}
        />
      </div>
    </div>
  );
}