import './styles/index.css';
import { CurrencyRates, Elements } from './types';

import { subtract } from "./utils/app";
import { handlerCurrency } from './utils/currency-handler';

// моковые данные для теста функции
const rates: CurrencyRates = {
  USD: 1,
  EUR: 0.85,
  RUB: 75,
};

const elements: Elements = {
  amountInput: document.getElementById('currency-from') as HTMLInputElement,
  resultInput: document.getElementById('currency-to') as HTMLInputElement,
  baseCurrencySelect: document.getElementById('base-currency') as HTMLSelectElement,
  targetCurrencySelect: document.getElementById('target-currency') as HTMLSelectElement,
  form: document.getElementById('currency-form') as HTMLFormElement,
};

elements.form.addEventListener('input', () => {
  const amount = parseFloat(elements.amountInput.value);
  const baseCurrency = elements.baseCurrencySelect.value;
  const targetCurrency = elements.targetCurrencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    elements.resultInput.value = '';
    return;
  }

  try {
    const result = handlerCurrency(amount, baseCurrency, targetCurrency, rates);
    elements.resultInput.value = result.toString();
  } catch (error) {
    console.error(error);
  }
})

// Тестовая функция
function init() {
  const form = document.querySelector("form");
  form?.addEventListener("submit", submitHandler);
}

function submitHandler(e: Event) {
  e.preventDefault();
  const num1 = document.querySelector("input[name='firstnumber']") as HTMLInputElement;
  const num2 = document.querySelector("input[name='secondnumber']") as HTMLInputElement;
  const result = subtract(Number(num1.value), Number(num2.value));
  const resultElement = document.querySelector("p");
  if (resultElement) {
    resultElement.textContent = result.toString();
  }
}

init();
