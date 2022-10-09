export default class NotificationMessage {
  static activeNotification;

  element;
  timeOut;

  constructor(
    message = '',
    {
      duration = 2000,
      type = 'success',
    } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
    <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">success</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
  }

  show(parent = document.body) {
    NotificationMessage.activeNotification?.remove();

    parent.append(this.element);

    this.timeOut = setTimeout(() => {
      this.remove();
    }, this.duration);

    NotificationMessage.activeNotification = this;
  }

  remove() {
    clearTimeout(this.timeOut);
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activeNotification = null;
  }
}
