const infoItemTemplate = document.getElementById('template-info').content.querySelector('.info__item');
const containerInfoList = document.querySelector('.info__list');


export interface TItem {
  title: string,
  value: string,
}

const items: TItem[] = [
  {title: 'RUB', value: '0,0096'},
  {title: 'USD', value: '0,0096'},
  {title: 'WON', value: '104,48'},
]

export function createInfoList(item) {
  const newItem = infoItemTemplate.cloneNode(true);
  const textItem = newItem.querySelector('.info__item-text');

  textItem.textContent = item.value;

  return newItem;
}

export function addInfo(item) {
  containerInfoList.prepend(item);
}

export function createInitialInfo(items) {
  items.reverse().forEach((item) => {
    addInfo(createInfoList(item));
  });
}