'use client';

import { useState } from 'react';
import NumberFlow from '@number-flow/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  initialValue: string;
  monthlyContribution: string;
  interestRate: string;
  period: string;
  interestPeriod: 'monthly' | 'yearly';
  timePeriod: 'months' | 'years';
}

interface Results {
  finalValue: number;
  totalInvested: number;
  totalInterest: number;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    initialValue: '',
    monthlyContribution: '',
    interestRate: '',
    period: '',
    interestPeriod: 'monthly',
    timePeriod: 'months',
  });

  const [results, setResults] = useState<Results | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCompoundInterest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const initial = parseFloat(formData.initialValue) || 0;
    const monthly = parseFloat(formData.monthlyContribution) || 0;
    const rate = parseFloat(formData.interestRate) || 0;
    const period = parseInt(formData.period) || 0;

    if (period <= 0) {
      alert('Period must be greater than 0');
      return;
    }

    // Convert annual rate to monthly if needed
    const monthlyRate =
      formData.interestPeriod === 'yearly'
        ? Math.pow(1 + rate / 100, 1 / 12) - 1
        : rate / 100 / 12;

    // Convert period to months
    const totalMonths =
      formData.timePeriod === 'years' ? period * 12 : period;

    // Calculate final value with compound interest
    // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
    const pvFinal = initial * Math.pow(1 + monthlyRate, totalMonths);

    let pmtFinal = 0;
    if (monthlyRate === 0) {
      pmtFinal = monthly * totalMonths;
    } else {
      pmtFinal =
        monthly * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    }

    const finalValue = pvFinal + pmtFinal;
    const totalInvested = initial + monthly * totalMonths;
    const totalInterest = finalValue - totalInvested;

    setResults({
      finalValue: Math.max(0, finalValue),
      totalInvested,
      totalInterest: Math.max(0, totalInterest),
    });
  };

  const handleClear = () => {
    setFormData({
      initialValue: '',
      monthlyContribution: '',
      interestRate: '',
      period: '',
      interestPeriod: 'monthly',
      timePeriod: 'months',
    });
    setResults(null);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl" style={{ backgroundColor: '#1e1e1e', borderColor: '#282828' }}>
          <CardHeader>
            <CardTitle className="text-4xl text-center">
              Compound Interest Calculator
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              Calculate your investment growth with compound interest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={calculateCompoundInterest} className="space-y-6">
              {/* Initial Value */}
              <div className="space-y-2">
                <Label htmlFor="initialValue">Initial Value</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    id="initialValue"
                    type="number"
                    name="initialValue"
                    value={formData.initialValue}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="pl-8 text-slate-50 placeholder-slate-500" style={{ backgroundColor: '#282828', borderColor: '#404040' }}
                  />
                </div>
              </div>

              {/* Monthly Contribution */}
              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    name="monthlyContribution"
                    value={formData.monthlyContribution}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="pl-8 text-slate-50 placeholder-slate-500" style={{ backgroundColor: '#282828', borderColor: '#404040' }}
                  />
                </div>
              </div>

              {/* Interest Rate with Period Selection */}
              <div className="space-y-2">
                <Label>Interest Rate</Label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      type="number"
                      name="interestRate"
                      value={formData.interestRate}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="pr-8 bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">
                      %
                    </span>
                  </div>
                  <Select value={formData.interestPeriod} onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, interestPeriod: value as 'monthly' | 'yearly' }))
                  }>
                    <SelectTrigger className="w-[150px]" style={{ backgroundColor: '#282828', borderColor: '#404040' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Per Month</SelectItem>
                      <SelectItem value="yearly">Per Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Period with Time Selection */}
              <div className="space-y-2">
                <Label>Period</Label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    placeholder="0"
                    step="1"
                    min="0"
                    className="flex-1 bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                  />
                  <Select value={formData.timePeriod} onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, timePeriod: value as 'months' | 'years' }))
                  }>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 font-semibold py-6 h-auto text-white"
                  style={{ backgroundColor: '#2196F3', color: 'white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1976D2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
                >
                  Calculate
                </Button>
                <Button
                  type="button"
                  onClick={handleClear}
                  className="flex-1 font-semibold py-6 h-auto text-white"
                  style={{ backgroundColor: '#2196F3', color: 'white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1976D2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <Card className="mt-8 shadow-2xl" style={{ backgroundColor: '#1e1e1e', borderColor: '#282828' }}>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Final Value */}
                <Card className="border" style={{ backgroundColor: '#1a3a1a', borderColor: '#2d5a2d' }}>
                  <CardHeader className="pb-3">
                    <CardDescription className="text-green-400">
                      Final Value
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400">
                      <NumberFlow
                        value={results.finalValue}
                        format={{
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }}
                        locales="en-US"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Total Invested */}
                <Card className="border" style={{ backgroundColor: '#1a2a3a', borderColor: '#2d4a5a' }}>
                  <CardHeader className="pb-3">
                    <CardDescription className="text-blue-400">
                      Total Invested
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400">
                      <NumberFlow
                        value={results.totalInvested}
                        format={{
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }}
                        locales="en-US"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Total Interest */}
                <Card className="border" style={{ backgroundColor: '#2a1a3a', borderColor: '#4a2d5a' }}>
                  <CardHeader className="pb-3">
                    <CardDescription className="text-purple-400">
                      Total Interest
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-400">
                      <NumberFlow
                        value={results.totalInterest}
                        format={{
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }}
                        locales="en-US"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-300">
                  Investment Breakdown
                </div>
                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                    style={{
                      width: `${
                        (results.totalInvested / results.finalValue) * 100
                      }%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>
                    Invested:{' '}
                    {((results.totalInvested / results.finalValue) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                  <span>
                    Interest:{' '}
                    {((results.totalInterest / results.finalValue) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
