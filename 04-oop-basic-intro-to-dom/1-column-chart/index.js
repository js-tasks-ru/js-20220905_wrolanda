export default class ColumnChart {
  chartHeight = 50;
  subElements = {};

  constructor({
                data = [],
                label = "",
                link = "",
                value = 0,
                formatHeading = data => data,
              } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);

    this.render();
  }

  get template() {
    return `
      <div class="column-chart_loading">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody()}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove("column-chart_loading");
    }
    this.subElements = this.getSubElements();
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElem of elements) {
      const name = subElem.dataset.element;
      result[name] = subElem;
    }

    return result;
  }

  getColumnBody() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map(item => {
      const percent = (item / maxValue * 100).toFixed(0);
      return `
        <div style="--value: ${Math.floor(
        item * scale
      )}" data-tooltip="${percent}%"></div>`;
    })
      .join('');
  }


  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : '';
  }

  update(data = []) {
    if (!this.data.length) {
      this.element.classList.add("column-chart_loading");
    }
    this.data = data;
    this.subElements.body.innerHTML = this.getColumnBody();
  }

  remove() {
      this.element?.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
