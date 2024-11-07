import React from 'react';

interface ResultCardProps {
  title: string;
  revenue: string;
  description: string;
  className?: string;
}

export function ResultCard({ title, revenue, description, className = '' }: ResultCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-indigo-600 my-2">{revenue}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}