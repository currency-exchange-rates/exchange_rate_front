// определяет тип данных для валют с учетом кода валюты и ее численного значения
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