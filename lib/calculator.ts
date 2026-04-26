import type { CalculatorInput, CalculatorResult, FormState } from './types';

export function parseFormState(form: FormState): CalculatorInput {
  return {
    initialValue: parseFloat(form.initialValue) || 0,
    monthlyContribution: parseFloat(form.monthlyContribution) || 0,
    interestRate: parseFloat(form.interestRate) || 0,
    period: parseInt(form.period, 10) || 0,
    ratePeriod: form.ratePeriod,
    timeUnit: form.timeUnit,
  };
}

export function calculateCompoundInterest(
  input: CalculatorInput
): CalculatorResult {
  const {
    initialValue,
    monthlyContribution,
    interestRate,
    period,
    ratePeriod,
    timeUnit,
  } = input;

  const monthlyRate =
    ratePeriod === 'yearly'
      ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
      : interestRate / 100 / 12;

  const totalMonths = timeUnit === 'years' ? period * 12 : period;

  const principalGrowth = initialValue * Math.pow(1 + monthlyRate, totalMonths);

  const contributionsGrowth =
    monthlyRate === 0
      ? monthlyContribution * totalMonths
      : monthlyContribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

  const finalValue = principalGrowth + contributionsGrowth;
  const totalInvested = initialValue + monthlyContribution * totalMonths;
  const totalInterest = finalValue - totalInvested;

  return {
    finalValue: Math.max(0, finalValue),
    totalInvested,
    totalInterest: Math.max(0, totalInterest),
  };
}

export const CURRENCY_FORMAT = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const;

// Default NumberFlow timing is ~750ms; bumped by +500ms for a slower reveal.
export const NUMBER_FLOW_TIMING = { duration: 750 } as const;
