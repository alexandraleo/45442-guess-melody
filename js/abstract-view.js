const getElement = (templateHTML) => {
  const newScreen = document.createElement(`template`);
  newScreen.innerHTML = templateHTML;
  return newScreen.content;
};

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Нельзя напрямую создавать AbstractView`);
    }
  }

  get template() {
    throw new Error(`Необходим шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }
  render() {
    return getElement(this.template);
  }
  bind() {
  }
}
