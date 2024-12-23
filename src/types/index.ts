export interface CurrencyRates {
  [key: string]: number;
}

export type Elements = {
  amountInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  baseCurrencySelect: HTMLSelectElement;
  targetCurrencySelect: HTMLSelectElement;
  form: HTMLFormElement;
};

export type ServerResponse<T> = {
  success: boolean;
} & T;
