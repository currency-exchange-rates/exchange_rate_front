import {TCurrencyCode, TCurrencyInfo} from "../types";

const infoItem = document.getElementById('template-info') as HTMLTemplateElement;
const infoItemTemplateContent = infoItem.content as HTMLTemplateElement["content"]
const infoItemTemplate = infoItemTemplateContent.querySelector('.info__item') as HTMLTemplateElement;
const containerInfoList = document.querySelector('.info__list') as HTMLElement;


const items = {
  "base_currency": "USD",
  "rates": [
    {"RUB": 3.6725},
    {"JPY": 70.2515},
  ]
}

export function createInfoList(item: TCurrencyCode) {
  const newItem = infoItemTemplate.cloneNode(true) as any;
  const textItem = newItem.querySelector('.info__item-text');

  textItem.textContent = item;

  return newItem;
}

export function addInfo(item: string) {
  containerInfoList?.prepend(item);
}

export function createInitialInfo(items: TCurrencyInfo) {
  items.rates.forEach((item) => {
    console.log(items)
    addInfo(createInfoList(item) && console.log(item));
  });
}