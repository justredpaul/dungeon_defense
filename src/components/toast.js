import { PanelComponent } from './panel';
import { isMobile } from '../helpers/isMobile';

export class ToastComponent {
  constructor(message, context) {
    this.message = message;
    this.context = context;

    this.position = isMobile() ? {
      x: 420,
      y: 255,
      width: 160,
      height: 40,
    } : {
      x: 720,
      y: 415,
      width: 250,
      height: 60,
    };
    this.textPosition = isMobile() ? {
      x: 500,
      y: 280
    } : {
      x: 845,
      y: 450
    };
    this.panel = new PanelComponent(this.position.x, this.position.y, this.position.width, this.position.height, context, 0.7);
  }

  _drawMessage = () => {
    this.context.font = isMobile() ? '16px Alagard' : '24px Alagard';
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.fillText(this.message, this.textPosition.x, this.textPosition.y)
  };

  init() {
    this.panel.init();
    this._drawMessage();
  }

  beforeUpdate() {
    this.panel.clear();
  }

  update() {
    this.panel.update();
    this._drawMessage();
  }
}
