export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  getTableHeaderTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerConfig.map(item => this.getHeaderRowTemplate(item)).join('')}
      </div>
    `;
  }

  getHeaderRowTemplate({id, title, sortable}) {
    return `
    <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
    `;
  }

  getTableBodyTemplate() {
    return `
      <div data-element="body" class="sortable-table__body">
      ${this.getTableRowsTemplate(this.data)}
      </div>
    `;
  }

  getTableRowsTemplate(data = []) {
    return data.map(item => {
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.getTableRowTemplate(item)}
      </a>
      `;
    }).join('');
  }

  getTableRowTemplate(item) {
    const cells = this.headerConfig.map(({id, template}) => {
      return {id, template};
    });
    return cells.map(({id, template}) => {
      template
        ? template(item[id])
        : `<div class="sortable-tasble__cell">${item[id]}</div>`;
    }).join('');

  }

  getTableTemplate() {
    return `
      <div class="sortable-table">
      ${this.getTableHeaderTemplate()}
      ${this.getTableBodyTemplate()}
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTableTemplate();

    const element = wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElems(element);
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });
    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getTableRowsTemplate(sortedData);
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const {sortType} = column;
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      default:
        throw new Error(`Unknown type ${sortType}`);
      }
    });
  }

  getSubElems(element) {
    const result = {};
    const elements = element.querySelectorAll(`[data-element]`);

    for (const subElem of elements) {
      const name = subElem.dataset.element;

      result[name] = subElem;
    }
    return result;
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

