export type RatePeriod = 'monthly' | 'yearly';
export type TimeUnit = 'months' | 'years';

export interface CalculatorInput {
  initialValue: number;
  monthlyContribution: number;
  interestRate: number;
  period: number;
  ratePeriod: RatePeriod;
  timeUnit: TimeUnit;
}

export interface CalculatorResult {
  finalValue: number;
  totalInvested: number;
  totalInterest: number;
}

export interface FormState {
  initialValue: string;
  monthlyContribution: string;
  interestRate: string;
  period: string;
  ratePeriod: RatePeriod;
  timeUnit: TimeUnit;
}

export const INITIAL_FORM_STATE: FormState = {
  initialValue: '',
  monthlyContribution: '',
  interestRate: '',
  period: '',
  ratePeriod: 'monthly',
  timeUnit: 'months',
};
