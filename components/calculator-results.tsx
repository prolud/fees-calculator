'use client';

import { forwardRef } from 'react';
import NumberFlow from '@number-flow/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CURRENCY_FORMAT, NUMBER_FLOW_TIMING } from '@/lib/calculator';
import { cn } from '@/lib/utils';
import type { CalculatorResult } from '@/lib/types';

interface CalculatorResultsProps {
  result: CalculatorResult;
  visible: boolean;
}

export const CalculatorResults = forwardRef<HTMLDivElement, CalculatorResultsProps>(
  function CalculatorResults({ result, visible }, ref) {
    const { finalValue, totalInvested, totalInterest } = result;
    const investedPct = finalValue > 0 ? (totalInvested / finalValue) * 100 : 0;
    const interestPct = finalValue > 0 ? (totalInterest / finalValue) * 100 : 0;

    return (
      <div
        ref={ref}
        aria-hidden={!visible}
        className={cn(
          'transition-all duration-500 ease-out',
          visible
            ? 'pointer-events-auto max-h-[2000px] opacity-100'
            : 'pointer-events-none max-h-0 overflow-hidden opacity-0'
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ResultCard label="Final Value" value={finalValue} tone="success" />
              <ResultCard label="Total Invested" value={totalInvested} tone="info" />
              <ResultCard label="Total Interest" value={totalInterest} tone="warning" />
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">
                Investment Breakdown
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="bg-info transition-[width] duration-500"
                  style={{ width: `${investedPct}%` }}
                />
                <div
                  className="bg-warning transition-[width] duration-500"
                  style={{ width: `${interestPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Invested: {investedPct.toFixed(1)}%</span>
                <span>Interest: {interestPct.toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

type Tone = 'success' | 'info' | 'warning';

const TONE_STYLES: Record<Tone, { bg: string; text: string }> = {
  success: { bg: 'bg-success-bg', text: 'text-success' },
  info: { bg: 'bg-info-bg', text: 'text-info' },
  warning: { bg: 'bg-warning-bg', text: 'text-warning' },
};

interface ResultCardProps {
  label: string;
  value: number;
  tone: Tone;
}

function ResultCard({ label, value, tone }: ResultCardProps) {
  const styles = TONE_STYLES[tone];
  return (
    <div className={cn('rounded-lg border border-border p-5 saturate-100 brightness-100 hover:brightness-125 hover:saturate-150 transition-all duration-150', styles.bg)}>
      <p className={cn('mb-2 text-sm font-medium', styles.text)}>{label}</p>
      <div className={cn('text-3xl font-bold', styles.text)}>
        <NumberFlow
          value={value}
          format={CURRENCY_FORMAT}
          locales="en-US"
          transformTiming={NUMBER_FLOW_TIMING}
          spinTiming={NUMBER_FLOW_TIMING}
          opacityTiming={NUMBER_FLOW_TIMING}
        />
      </div>
    </div>
  );
}
