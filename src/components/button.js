import { Clickable } from 'baseClasses/clickable';
import { isMobile } from 'helpers/isMobile';
import { TextComponent } from './text';

const BUTTON_SIZES = {
  s: {
    width: 48,
    height: 22,
    fontSize: 16,
  },
  m: {
    width: 72,
    height: 33,
    fontSize: 20,
  },
  l: {
    width: 96,
    height: 44,
    fontSize: 24,
  },
};

export class ButtonComponent extends Clickable {
  constructor({ x, y, width, height, label, onClick, context, size = 's', hidden }) {
    super({
      x,
      y,
      width,
      height,
    }, onClick, hidden);

    this.width = Math.max(width, 40);
    this.height = Math.max(height, 30);
    this.label = new TextComponent({
      text: label,
      context,
      color: '#f1f1f1',
      fontSize: isMobile() ? 16 : 20,
      shadowColor: '#000',
    });
    this.context = context;
    this.size = size;
  }

  _drawButton() {
    const buttonCenter = {
      x: this.x + Math.ceil(this.width / 2),
      y: this.y + Math.ceil(this.height / 2),
    };
    const buttonSize = BUTTON_SIZES[this.size];

    const buttonTile = document.getElementById('button_idle');
    this.context.drawImage(
      buttonTile,
      buttonCenter.x - buttonSize.width / 2,
      buttonCenter.y - buttonSize.height / 2,
      buttonSize.width,
      buttonSize.height
    );

    this.label.fontSize = buttonSize.fontSize;
    this.label.draw(buttonCenter.x, buttonCenter.y);
  }

  setLabel(label) {
    this.label.text = label;
    this._drawButton();
  }

  init() {
    this._drawButton();
  }

  update() {
    this._drawButton();
  }
}
