import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface ScenarioTableProps {
  scenarios: {
    best: { roi: number; revenue: string };
    middle: { roi: number; revenue: string };
    worst: { roi: number; revenue: string };
  };
  valueType: 'AOV' | 'LTV';
}

export function ScenarioTable({ scenarios, valueType }: ScenarioTableProps) {
  const getAnnualRevenue = (monthlyRoi: number): string => {
    return formatCurrency(monthlyRoi * 12);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Detailed Analysis ({valueType} Based)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scenario
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Revenue
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Annual Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(scenarios).map(([key, value]) => (
              <tr key={key}>
                <td className="px-4 py-3 text-sm text-gray-900 capitalize">{key} Case</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">{value.revenue}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {getAnnualRevenue(value.roi)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}