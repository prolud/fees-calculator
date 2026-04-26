'use client';

import { useState } from 'react';

import { CalculatorForm } from '@/components/calculator-form';
import { CalculatorResults } from '@/components/calculator-results';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { calculateCompoundInterest, parseFormState } from '@/lib/calculator';
import { INITIAL_FORM_STATE, type CalculatorResult, type FormState } from '@/lib/types';

export default function Home() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleSubmit = () => {
    const input = parseFormState(form);
    if (input.period <= 0) return;
    setResult(calculateCompoundInterest(input));
  };

  const handleClear = () => {
    setForm(INITIAL_FORM_STATE);
    setResult(null);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl md:text-4xl">
              Compound Interest Calculator
            </CardTitle>
            <CardDescription className="text-center">
              Calculate your investment growth with compound interest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalculatorForm
              form={form}
              onChange={setForm}
              onSubmit={handleSubmit}
              onClear={handleClear}
            />
          </CardContent>
        </Card>

        {result && <CalculatorResults result={result} />}
      </div>
    </main>
  );
}
