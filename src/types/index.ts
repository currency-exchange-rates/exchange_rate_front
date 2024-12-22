export interface CurrencyRates {
  [key: string]: number;
}

export interface CustomSelectParams {
  name: string;
  options: [string, string][];
  targetValue?: string;
  onSelected?: (selectInstance: ICustomSelect, selectedOption: HTMLElement | null) => void;
}

export class ICustomSelect {
  // CSS-классы и селекторы
  static SELECT = 'custom-select';
  static SELECT_SHOW = 'custom-select--show';
  static OPTION = 'custom-option';
  static OPTION_SELECTED = 'custom-option--selected';
  static DATA = '[data-select]';
  static DATA_TOGGLE = '[data-select="toggle"]';

  private _el: HTMLElement;
  private _params: CustomSelectParams;
  private _elToggle: HTMLButtonElement | null = null;
  private _onClickFn: (e: MouseEvent) => void;

  // Шаблон для рендера кастомного селектора
  static template(params: CustomSelectParams): string {
    const { name, options, targetValue } = params;
    const items: string[] = [];
    let selectedIndex = -1;
    let selectedValue = '';
    let selectedContent = 'Выберите валюту';
    let selectedIconPath = '';
  
    options.forEach(([value, text], index) => {
      const selectedClass = value === targetValue ? ` ${this.OPTION_SELECTED}` : '';
      if (value === targetValue) {
        selectedIndex = index;
        selectedValue = value;
        selectedContent = text;
        selectedIconPath = `/images/countries-icons/${value.toUpperCase()}.svg`;
      }
      const iconPath = `/images/countries-icons/${value.toUpperCase()}.svg`;
      items.push(
        `<li class="${this.OPTION}${selectedClass}" data-select="option" data-value="${value}" data-index="${index}">
          <img src="${iconPath}" alt="${value}" class="custom-option-icon"> 
          ${text}
        </li>`
      );
    });
  
    return `
      <button type="button" class="${this.SELECT}-toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">
      ${selectedIconPath ? `<img src="${selectedIconPath}" alt="${selectedValue}" class="custom-option-icon">` : ''}
      ${selectedContent}</button>
      <div class="${this.SELECT}-dropdown">
        <ul class="${this.SELECT}__options">${items.join('')}</ul>
      </div>
    `;
  }

  // Метод для скрытия всех открытых селекторов
  static hideOpenSelect() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest(`.${this.SELECT}`)) {
        document.querySelectorAll(`.${this.SELECT_SHOW}`).forEach((el) => {
          el.classList.remove(this.SELECT_SHOW);
        });
      }
    });
  }

  // Создание экземпляра кастомного селектора
  static create(target: string | HTMLElement, params: CustomSelectParams) {
    const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (element) {
      return new this(element, params);
    }
    return null;
  }

  constructor(target: string | HTMLElement, params: CustomSelectParams) {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (!el) throw new Error('Target element not found');
    this._el = el;
    this._params = params;
    this._onClickFn = this._onClick.bind(this);

    if (this._params.options) {
      this._el.innerHTML = ICustomSelect.template(this._params);
      this._el.classList.add(ICustomSelect.SELECT);
    }

    this._elToggle = this._el.querySelector<HTMLButtonElement>(ICustomSelect.DATA_TOGGLE);
    this._el.addEventListener('click', this._onClickFn);

    if (this._elToggle) {
      // Устанавливаем начальное положение стрелки вниз
      this._elToggle.classList.add('custom-select-toggle--down');
    }
  }

  private _onClick(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const closestElement = target.closest(ICustomSelect.DATA) as HTMLElement | null;
    const type = closestElement?.dataset.select;
    if (type === 'toggle') {
      this.toggle();
    } else if (type === 'option') {
      this._changeValue(target);
    }
  }

  private _updateOption(el: HTMLElement) {
    const elOption = el.closest(`.${ICustomSelect.OPTION}`) as HTMLElement | null;
    const elOptionSel = this._el.querySelector(`.${ICustomSelect.OPTION_SELECTED}`) as HTMLElement | null;
  
    if (elOptionSel) {
      elOptionSel.classList.remove(ICustomSelect.OPTION_SELECTED);
    }
    elOption?.classList.add(ICustomSelect.OPTION_SELECTED);
  
    if (this._elToggle) {
      this._elToggle.textContent = elOption?.textContent ?? 'Выберите валюту';
      this._elToggle.value = elOption?.dataset.value ?? '';
      this._elToggle.dataset.index = elOption?.dataset.index ?? '-1';
  
      // Обновляем путь к иконке для выбранной валюты
      const selectedValue = elOption?.dataset.value ?? '';
      const iconPath = `/images/countries-icons/${selectedValue.toUpperCase()}.svg`;  // Путь к иконке
      let iconImg = this._elToggle.querySelector('img') as HTMLImageElement;
  
      if (!iconImg) {
        // Если img не найден, создайте его
        iconImg = document.createElement('img');
        this._elToggle.insertBefore(iconImg, this._elToggle.firstChild); // Вставляем img в начало кнопки
      }
  
      iconImg.src = iconPath;  // Обновляем путь к изображению
      iconImg.alt = selectedValue;  // Обновляем атрибут alt
  
      // Убираем класс для отображения открытого селектора
      this._el.classList.remove('custom-select--open'); // Убираем класс, который открыл дропдаун
      this._elToggle.classList.remove('custom-select-toggle--up'); // Убираем стрелку вверх
      this._elToggle.classList.add('custom-select-toggle--down'); // Стрелка вниз
      this._el.classList.remove('custom-select--open'); // Возвращаем нормальный вид кнопки
    }
  
    this._el.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected?.(this, elOption);
  }

  private _reset() {
    const selected = this._el.querySelector(`.${ICustomSelect.OPTION_SELECTED}`) as HTMLElement | null;
    if (selected) {
      selected.classList.remove(ICustomSelect.OPTION_SELECTED);
    }

    if (this._elToggle) {
      this._elToggle.textContent = 'Выберите валюту';
      this._elToggle.value = '';
      this._elToggle.dataset.index = '-1';
    }

    this._el.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected?.(this, null);
  }

  private _changeValue(el: HTMLElement) {
    if (el.classList.contains(ICustomSelect.OPTION_SELECTED)) {
      return;
    }
    this._updateOption(el);
    this.hide();
  }

  toggle() {
    const toggleButton = this._elToggle;
    if (toggleButton) {
      if (this._el.classList.contains(ICustomSelect.SELECT_SHOW)) {
        this.hide();
        toggleButton.classList.remove('custom-select-toggle--up');
        toggleButton.classList.add('custom-select-toggle--down');
        this._el.classList.remove('custom-select--open');
      } else {
        this.show();
        toggleButton.classList.remove('custom-select-toggle--down');
        toggleButton.classList.add('custom-select-toggle--up');
        this._el.classList.add('custom-select--open');
      }
    }
  }

  show() {
    document.querySelectorAll(`.${ICustomSelect.SELECT_SHOW}`).forEach((el) => {
      el.classList.remove(ICustomSelect.SELECT_SHOW);
    });
    this._el.classList.add(ICustomSelect.SELECT_SHOW);
  }

  hide() {
    this._el.classList.remove(ICustomSelect.SELECT_SHOW);
  }

  dispose() {
    this._el.removeEventListener('click', this._onClickFn);
  }

  get value() {
    return this._elToggle?.value ?? '';
  }

  set value(value: string) {
    let isExists = false;
    this._el.querySelectorAll(`.${ICustomSelect.OPTION}`).forEach((option) => {
      if ((option as HTMLElement).dataset.value === value) {
        isExists = true;
        this._updateOption(option as HTMLElement);
      }
    });

    if (!isExists) {
      this._reset();
    }
  }

  get selectedIndex() {
    return this._elToggle?.dataset.index ?? '-1';
  }

  set selectedIndex(index: string) {
    const option = this._el.querySelector<HTMLElement>(`.${ICustomSelect.OPTION}[data-index="${index}"]`);
    if (option) {
      this._updateOption(option);
    } else {
      this._reset();
    }
  }
}

ICustomSelect.hideOpenSelect();
