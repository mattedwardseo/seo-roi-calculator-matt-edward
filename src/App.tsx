import React, { useState, useEffect } from 'react';
import { Calculator, Info, TrendingUp } from 'lucide-react';
import { InputField } from './components/InputField';
import { ResultCard } from './components/ResultCard';
import { ScenarioTable } from './components/ScenarioTable';
import { Toggle } from './components/Toggle';
import { calculateROI, formatCurrency } from './utils/calculations';

function App() {
  const [inputs, setInputs] = useState({
    tms: 10000,
    ctr: 30,
    cr: 2,
    aov: 100,
    ltv: 500,
    useLTV: false
  });

  const [scenarios, setScenarios] = useState({
    best: { roi: 0, revenue: '0' },
    middle: { roi: 0, revenue: '0' },
    worst: { roi: 0, revenue: '0' }
  });

  useEffect(() => {
    const value = inputs.useLTV ? inputs.ltv : inputs.aov;
    const best = calculateROI(inputs.tms, inputs.ctr / 100, inputs.cr / 100, value);
    const middle = calculateROI(inputs.tms, (inputs.ctr / 100) * 0.6, (inputs.cr / 100) * 0.8, value);
    const worst = calculateROI(inputs.tms, (inputs.ctr / 100) * 0.3, (inputs.cr / 100) * 0.6, value);

    setScenarios({
      best: { roi: best, revenue: formatCurrency(best) },
      middle: { roi: middle, revenue: formatCurrency(middle) },
      worst: { roi: worst, revenue: formatCurrency(worst) }
    });
  }, [inputs]);

  const handleInputChange = (name: string, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">SEO ROI Calculator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate potential returns from your SEO investments based on key metrics
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">Input Metrics</h2>
            </div>

            <div className="space-y-6">
              <InputField
                label="Total Monthly Searches (TMS)"
                value={inputs.tms}
                onChange={(value) => handleInputChange('tms', value)}
                info="Expected monthly search volume for target keywords"
              />

              <InputField
                label="Click-Through Rate (%)"
                value={inputs.ctr}
                onChange={(value) => handleInputChange('ctr', value)}
                info="Expected CTR based on SERP position (1st: ~30%, 5th: ~9.5%, 10th: ~3%)"
                max={100}
              />

              <InputField
                label="Conversion Rate (%)"
                value={inputs.cr}
                onChange={(value) => handleInputChange('cr', value)}
                info="Expected conversion rate (ToF: ~0.5%, MoF: ~2%, BoF: ~5%)"
                max={100}
              />

              <div className="space-y-4">
                <Toggle
                  enabled={inputs.useLTV}
                  onChange={(value) => handleInputChange('useLTV', value)}
                  label="Use Customer Lifetime Value"
                  info="Toggle between Average Order Value and Customer Lifetime Value"
                />

                {inputs.useLTV ? (
                  <InputField
                    label="Customer Lifetime Value ($)"
                    value={inputs.ltv}
                    onChange={(value) => handleInputChange('ltv', value)}
                    info="Total revenue expected from a customer over time"
                    prefix="$"
                  />
                ) : (
                  <InputField
                    label="Average Order Value ($)"
                    value={inputs.aov}
                    onChange={(value) => handleInputChange('aov', value)}
                    info="Average revenue per conversion"
                    prefix="$"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">ROI Scenarios</h2>
              </div>

              <div className="grid gap-4">
                <ResultCard
                  title="Best Case"
                  revenue={scenarios.best.revenue}
                  description="Achieving top rankings with optimal conversion rates"
                  className="border-green-100 bg-green-50"
                />
                <ResultCard
                  title="Middle Case"
                  revenue={scenarios.middle.revenue}
                  description="Moderate rankings with average performance"
                  className="border-blue-100 bg-blue-50"
                />
                <ResultCard
                  title="Worst Case"
                  revenue={scenarios.worst.revenue}
                  description="Lower rankings with below-average performance"
                  className="border-amber-100 bg-amber-50"
                />
              </div>
            </div>

            <ScenarioTable 
              scenarios={scenarios} 
              valueType={inputs.useLTV ? 'LTV' : 'AOV'} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;