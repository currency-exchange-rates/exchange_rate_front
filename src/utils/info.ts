import {TCurrencyCode, TCurrencyInfo, TDate} from "../types";

const infoItem = document.getElementById('template-info') as HTMLTemplateElement;
const infoItemTemplateContent = infoItem.content as HTMLTemplateElement["content"]
const infoItemTemplate = infoItemTemplateContent.querySelector('.info__item') as HTMLTemplateElement;
const containerInfoList = document.querySelector('.info__list') as HTMLElement;


export function createInfoList(item: any) {
  const newItem = infoItemTemplate.cloneNode(true) as any;
  const textItem = newItem.querySelector('.info__item-text');

  for (let key in item) {
    textItem.innerText = `1 ${key} = ${item[key]}`;
  }

  return newItem;
}

export function createDate(date: TDate) {
  const newItem = infoItemTemplate.cloneNode(true) as any;
  const textItem = newItem.querySelector('.info__item-text');

  textItem.innerText = `Данные курса предоставлены на ${date}`;

  return newItem;
}

export function addInfo(newItem: any) {
  containerInfoList.prepend(newItem);
}

export function createInitialInfo(items: TCurrencyInfo) {

  items.rates.forEach((item) => {
    addInfo(createInfoList(item));
  });
}

let date = new Date()
addInfo(createDate(date.toLocaleString()));