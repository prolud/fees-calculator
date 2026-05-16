'use client';

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
import type { FormState, RatePeriod, TimeUnit } from '@/lib/types';

interface CalculatorFormProps {
  form: FormState;
  onChange: (next: FormState) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export function CalculatorForm({
  form,
  onChange,
  onSubmit,
  onClear,
}: CalculatorFormProps) {
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    onChange({ ...form, [key]: value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CurrencyField
          id="initialValue"
          label="Valor inicial"
          value={form.initialValue}
          onChange={(v) => update('initialValue', v)}
        />
        <CurrencyField
          id="monthlyContribution"
          label="Aportes mensais"
          value={form.monthlyContribution}
          onChange={(v) => update('monthlyContribution', v)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="interestRate">Taxa de juros</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="interestRate"
                type="number"
                inputMode="decimal"
                value={form.interestRate}
                onChange={(e) => update('interestRate', e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="pr-8"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                %
              </span>
            </div>
            <Select
              value={form.ratePeriod}
              onValueChange={(v) => update('ratePeriod', v as RatePeriod)}
            >
              <SelectTrigger className="w-[120px] shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Por Ano</SelectItem>
                <SelectItem value="monthly">Por Mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="period">Período</Label>
          <div className="flex gap-2">
            <Input
              id="period"
              type="number"
              inputMode="numeric"
              value={form.period}
              onChange={(e) => update('period', e.target.value)}
              placeholder="0"
              step="1"
              min="0"
              className="flex-1"
            />
            <Select
              value={form.timeUnit}
              onValueChange={(v) => update('timeUnit', v as TimeUnit)}
            >
              <SelectTrigger className="w-[120px] shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="years">Anos</SelectItem>
                <SelectItem value="months">Meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onClear}
          className="flex-1"
        >
          Limpar
        </Button>
        <Button type="submit" size="lg" className="flex-1">
          Calcular
        </Button>
      </div>
    </form>
  );
}

interface CurrencyFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function CurrencyField({ id, label, value, onChange }: CurrencyFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          $
        </span>
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0"
          className="pl-8"
        />
      </div>
    </div>
  );
}
