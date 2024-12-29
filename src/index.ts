import './styles/index.css';
import {CurrencyRates, ICustomSelect} from './types';
import {createInitialInfo} from "./utils/info";

const rates: CurrencyRates = {
  USD: 1,
  EUR: 0.85,
  RUB: 75.5,
  GBP: 0.75,
  JPY: 110,
};

// Получаем элементы
const swapButton = document.querySelector('.form__button-swap') as HTMLButtonElement;
const currencyFromInput = document.querySelector('#currency-from') as HTMLInputElement;
const currencyToInput = document.querySelector('#currency-to') as HTMLInputElement;
const baseCurrencySelect = document.querySelector('#custom-select-container-base') as HTMLElement;
const targetCurrencySelect = document.querySelector('#custom-select-container-target') as HTMLElement;

// Функция смены значений
function swapCurrencies(): void {
  const baseCurrencyValue: string = baseCurrencySelect.querySelector('button')?.value || '';
  const targetCurrencyValue: string = targetCurrencySelect.querySelector('button')?.value || '';
  const baseAmount = parseFloat(currencyFromInput.value) || 0;

  const targetAmount = (baseAmount * rates[targetCurrencyValue] / rates[baseCurrencyValue]).toFixed(2);

  currencyFromInput.value = targetAmount;
  currencyToInput.value = baseAmount.toString();

  baseCurrencySelect.querySelector('button')!.value = targetCurrencyValue;
  targetCurrencySelect.querySelector('button')!.value = baseCurrencyValue;

  const baseCurrencyOption = baseCurrencySelect.querySelector(`[data-value="${targetCurrencyValue}"]`);
  const targetCurrencyOption = targetCurrencySelect.querySelector(`[data-value="${baseCurrencyValue}"]`);

  const baseCurrencyButton = baseCurrencySelect.querySelector('button')!;
  const targetCurrencyButton = targetCurrencySelect.querySelector('button')!;

  baseCurrencyButton.innerHTML = '';
  targetCurrencyButton.innerHTML = '';

  const newBaseCurrencyImage = document.createElement('img');
  newBaseCurrencyImage.src = `./images/countries-icons/${targetCurrencyValue.toUpperCase()}.svg`;
  newBaseCurrencyImage.alt = targetCurrencyValue;
  baseCurrencyButton.appendChild(newBaseCurrencyImage);

  const newTargetCurrencyImage = document.createElement('img');
  newTargetCurrencyImage.src = `./images/countries-icons/${baseCurrencyValue.toUpperCase()}.svg`;
  newTargetCurrencyImage.alt = baseCurrencyValue;
  targetCurrencyButton.appendChild(newTargetCurrencyImage);

  if (baseCurrencyOption) {
    const baseCurrencyText = document.createTextNode(baseCurrencyOption.textContent || '');
    baseCurrencyButton.appendChild(baseCurrencyText);
  }
  if (targetCurrencyOption) {
    const targetCurrencyText = document.createTextNode(targetCurrencyOption.textContent || '');
    targetCurrencyButton.appendChild(targetCurrencyText);
  }
}

// Создание кастомных селекторов
const baseCurrencySelectParams = {
  name: 'base-currency',
  options: [
    ['USD', '(USD) Доллар США'],
    ['EUR', '(Euro) Евро'],
    ['RUB', '(RUB) Российский рубль'],
    ['GBP', '(GBP) Фунт стерлингов'],
    ['JPY', '(JPY) Японская иена'],
  ] as [string, string][],
};

const targetCurrencySelectParams = {
  name: 'target-currency',
  options: [
    ['USD', '(USD) Доллар США'],
    ['EUR', '(Euro) Евро'],
    ['RUB', '(RUB) Российский рубль'],
    ['GBP', '(GBP) Фунт стерлингов'],
    ['JPY', '(JPY) Японская иена'],
  ] as [string, string][],
};

// Инициализация кастомных селекторов
ICustomSelect.create('#custom-select-container-base', baseCurrencySelectParams);
ICustomSelect.create('#custom-select-container-target', targetCurrencySelectParams);

// Добавляем обработчик на кнопку
swapButton.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault();
  swapCurrencies();
});

// Функция для обработки ввода в поля
function updateCurrencyTo(): void {
  const baseAmount = parseFloat(currencyFromInput.value);
  if (isNaN(baseAmount)) {
    currencyToInput.value = "";
    return;
  }
  const baseCurrencyValue: string = baseCurrencySelect.querySelector('button')?.value || '';
  const targetCurrencyValue: string = targetCurrencySelect.querySelector('button')?.value || '';
  const targetAmount = (baseAmount * rates[targetCurrencyValue] / rates[baseCurrencyValue]).toFixed(2);
  currencyToInput.value = targetAmount;
}

// Добавляем обработчик на изменение значения в поле "currency-from"
currencyFromInput.addEventListener('input', updateCurrencyTo);

// Инициализация работы с кастомными селекторами
ICustomSelect.hideOpenSelect();

export const items: any = {
  "base_currency": "USD",
  "rates": [
    {"RUB": 3.6725},
    {"JPY": 70.2515},
  ]
}

createInitialInfo(items);

// Promise.all([getInitialInfo('USD')])
//   .then(([items]) => {
//     createInitialInfo(items);
//   })
//   .catch(console.error);
