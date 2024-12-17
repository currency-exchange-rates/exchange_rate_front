import { CurrencyRates } from '../types';

export function handlerCurrency (
  amount: number,
  baseCurrency: string,
  targetCurrency: string,
  rates: CurrencyRates
): number {
  if (!rates[baseCurrency] || !rates[targetCurrency]) {
    throw new Error('Invalid or missing currency rates');
  }

  if (amount <= 0) {
    throw new Error('Amount should be greater than zero');
  }

  const baseRate = rates[baseCurrency];
  const targetRate = rates[targetCurrency];

  const result = (amount / baseRate) * targetRate;

  return parseFloat(result.toFixed(2));
}
