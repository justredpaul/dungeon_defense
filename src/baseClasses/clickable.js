export class Clickable {
  constructor(bounds, onClick, hidden = false) {
    this.x = bounds?.x || 0;
    this.y = bounds?.y || 0;
    this.width = bounds?.width || 0;
    this.height = bounds?.height || 0;
    this.onClick = onClick;
    this.hidden = hidden;
    this.threshold = 300;
    this.lastCalled = null;

    this.onButtonClick = evt => this.checkClick(evt);
    this._setListeners();
  }

  _setListeners() {
    window.addEventListener('click', this.onButtonClick);
    window.addEventListener('touchstart', this.onButtonClick);

    this._removeListeners = () => {
      window.removeEventListener('click', this.onButtonClick);
      window.removeEventListener('touchstart', this.onButtonClick);
    }
  };

  checkClick(evt) {
    if (this.hidden) return;
    if (this.lastCalled && performance.now() - this.lastCalled < this.threshold) return;

    const canvasPosition = document.querySelector('canvas').getBoundingClientRect();

    let x;
    let y;

    if (evt.type === 'click') {
      x = evt.x - canvasPosition.left;
      y = evt.y - canvasPosition.top;
    } else if (evt.type === 'touchstart') {
      const touch = evt.touches[0];

      x = touch.pageX - canvasPosition.left;
      y = touch.pageY - canvasPosition.top;
    }

    if (x < this.x || x > this.x + this.width) return;
    if (y < this.y || y > this.y + this.height) return;

    this.lastCalled = performance.now();
    this.onClick({ x, y });
  }

  listen() {
    this.hidden = false;
    this._setListeners();
  }

  destroy() {
    this.hidden = true;
    this._removeListeners();
  }
}
