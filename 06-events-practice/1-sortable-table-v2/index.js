export default class SortableTable {
  element;
  subElements = {};

  onSortClick = event => {
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc',
      };

      return orders[order];
    };

    if (column) {
      const {id, order} = column.dataset;
      const newOrder = toggleOrder(order);
      const sortedData = this.sortData(id, newOrder);
      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = newOrder;

      if (!arrow) {
        column.append(this.subElements.arrow);
      }

      this.subElements.body.innerHTML = this.getTableRowsTemplate(sortedData);
    }
  };

  constructor(headerConfig = [],
    {
      data = [],
      sorted = {
        id: headerConfig.find(item => item.sortable).id,
        order: 'asc'
      }
    } = {}) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;

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
    const order = this.sorted.id === id
      ? this.sorted.order
      : 'asc';

    return `
    <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${this.sorted.order}">
        <span>${title}</span>
        ${this.getHeaderSortingArrow(id)}
      </div>
    `;
  }

  getHeaderSortingArrow(id) {
    const isOrderExist = this.sorted.id === id
      ? this.sorted.order
      : '';

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : '';
  }

  getTableBodyTemplate(data) {
    return `
      <div data-element="body" class="sortable-table__body">
      ${this.getTableRowsTemplate(data)}
      </div>
    `;
  }

  getTableRowsTemplate(data = []) {
    return data.map(item =>
      `
      <div class="sortable-table__row">
        ${this.getTableRowTemplate(item)}
      </div>
      `
    ).join('');
  }

  getTableRowTemplate(item) {
    const cells = this.headerConfig.map(({id, template}) => {
      return {id, template};
    });
    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-tasble__cell">${item[id]}</div>`;
    }).join('');

  }

  getTableTemplate(data) {
    return `
      <div class="sortable-table">
      ${this.getTableHeaderTemplate()}
      ${this.getTableBodyTemplate(data)}
      </div>
    `;
  }

  render() {
    const {id, order} = this.sorted;
    const wrapper = document.createElement('div');
    const sortedData = this.sortData(id, order);

    wrapper.innerHTML = this.getTableTemplate(sortedData);

    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElems(this.element);

    this.initEventListeners();
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  sortData(id, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === id);
    const {sortType, customSorting} = column;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[id] - b[id]);
      case 'string':
        return direction * a[id].localeCompare(b[id], ['ru']);
      case 'custom':
        return direction * customSorting(a, b);
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
    this.subElements = {};
  }
}
