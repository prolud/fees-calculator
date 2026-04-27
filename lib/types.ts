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

export const EMPTY_RESULT: CalculatorResult = {
  finalValue: 0,
  totalInvested: 0,
  totalInterest: 0,
};

export interface FormState {
  initialValue: string;
  monthlyContribution: string;
  interestRate: string;
  period: string;
  ratePeriod: RatePeriod;
  timeUnit: TimeUnit;
}

const ratePeriodLocalStorage = () => {
  if (typeof window === 'undefined') return 'yearly';
  return localStorage.getItem('pref_ratePeriod') as RatePeriod ?? 'yearly';
}
const timeUnitLocalStorage = () => {
  if (typeof window === 'undefined') return 'years';
  return localStorage.getItem('pref_timeUnit') as TimeUnit ?? 'years';
}

export const INITIAL_FORM_STATE: FormState = {
  initialValue: '',
  monthlyContribution: '',
  interestRate: '',
  period: '',
  ratePeriod: ratePeriodLocalStorage(),
  timeUnit: timeUnitLocalStorage(),
};
