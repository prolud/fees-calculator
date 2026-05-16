'use client';

import { useRef, useState } from 'react';

import { AppHeader } from '@/components/app-header';
import { CalculatorForm } from '@/components/calculator-form';
import { CalculatorResults } from '@/components/calculator-results';
import { SupportDrawer, useAutoSupportDrawer } from '@/components/support-drawer';
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
  const { open: drawerOpen, setOpen: setDrawerOpen } = useAutoSupportDrawer();

  const handleFormChange = (next: FormState) => {
    localStorage.setItem("pref_ratePeriod", next.ratePeriod);
    localStorage.setItem("pref_timeUnit", next.timeUnit);

    setForm(next);
  };

  const handleSubmit = () => {
    const input = parseFormState(form);
    if (input.period <= 0) return;

    setResult(calculateCompoundInterest(input));
    setShowResults(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleClear = () => {
    setForm(INITIAL_FORM_STATE);
    setShowResults(false);
    setResult(EMPTY_RESULT);

    setTimeout(() => {
      window.scroll({ behavior: 'smooth', top: 0 });
    }, 100);
  };

  return (
    <>
      <AppHeader onSupportClick={() => setDrawerOpen(true)} />
      <main className="flex min-h-screen sm:items-center justify-center p-4 py-8 pt-20">
        <div className="w-full max-w-2xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl md:text-4xl">
                Calculadora de juros compostos
              </CardTitle>
              <CardDescription className="text-center">
                Calcule o crescimento do seu investimento com juros compostos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalculatorForm
                form={form}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                onClear={handleClear}
              />
            </CardContent>
          </Card>

          <CalculatorResults ref={resultsRef} result={result} visible={showResults} />
        </div>
      </main>
      <SupportDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
