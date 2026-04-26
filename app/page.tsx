'use client';

import { useRef, useState } from 'react';

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
import {
  EMPTY_RESULT,
  INITIAL_FORM_STATE,
  type CalculatorResult,
  type FormState,
} from '@/lib/types';

export default function Home() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [result, setResult] = useState<CalculatorResult>(EMPTY_RESULT);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    const input = parseFormState(form);
    if (input.period <= 0) return;

    setResult(calculateCompoundInterest(input));
    setShowResults(true);

    // Wait for the expand transition to progress before scrolling so the
    // target element has its final height when scrollIntoView is called.
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  };

  const handleClear = () => {
    setForm(INITIAL_FORM_STATE);
    setShowResults(false);
    setResult(EMPTY_RESULT);
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

        <CalculatorResults ref={resultsRef} result={result} visible={showResults} />
      </div>
    </main>
  );
}
