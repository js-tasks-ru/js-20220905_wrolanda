export default class DoubleSlider {
  element;
  subElements = {};

  onThumbPointerMove = event => {
    event.preventDefault();
  }

  const { left: innerLeft, right: innerRight, width } =
  this.subElements.inner.getBoundingClientRect

  if (this.dragging === this.subElements.thumbLeft) {
    let newLeft = (event.clientX - innerLeft + this.shiftX) / width;

    if (newLeft < 0) {
      newLeft = 0;
    }
    newLeft *=100;
    const right = parseFloat(this.subElements.thumbRight.style.right);

    if(newLeft + right > 100) {
      newLeft = 100 - right;
    }
    this.dragging.style.left = this.subElements.progress.style.left = newLeft + '%';
    this.subElements.from.innerHTML = this.formatValue(this.getValue().from);
  }
  if (this.dragging === this.subElements.thumbRight) {

  }
}
