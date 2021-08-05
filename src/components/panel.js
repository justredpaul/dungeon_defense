import { getGlobal } from '../helpers/globals';

export class PanelComponent {
  constructor(x, y, width, height, context, opacity = 1) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
    this.opacity = opacity;
  }

  _drawPanel() {
    this.context.save();
    this.context.globalAlpha = this.opacity;
    this.context.fillStyle = '#D3BFA9';
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.context.fillRect(this.x, this.y, this.width, this.height);

    const strokeWidth = getGlobal('tilesScale');
    this.context.lineWidth = strokeWidth;
    this.context.strokeStyle = '#AA8D7A';
    this.context.strokeRect(this.x + strokeWidth / 2, this.y + strokeWidth / 2, this.width - strokeWidth, this.height - strokeWidth);
    this.context.restore();
  }

  init() {
    this._drawPanel();
  }

  update() {
    this._drawPanel();
  }

  clear() {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  }
}
