import { ButtonComponent } from './button';

export class PopupComponent {
  constructor({ id, width, height, content, action, canvas, context, hidden }) {
    this.id = id;
    this.x = canvas.width / 2 - width / 2;
    this.y = canvas.height / 2 - height / 2;
    this.width = width;
    this.height = height;
    this.content = content;
    this.canvas = canvas;
    this.context = context;

    if (action) {
      this.action = new ButtonComponent({
        x: this.x + this.width / 2 - 50,
        y: this.y + this.height - 100,
        width: 100,
        height: 100,
        label: action.caption,
        onClick: () => {
          action.onClick();
          this.close();
        },
        context,
        size: action.size,
        hidden,
      });
    }
    this.hidden = hidden === undefined ? true : hidden;
  }

  _drawBackground = () => {
    this.context.save();
    this.context.fillStyle = '#1f1f1f';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillRect(this.x, this.y, this.width, this.height);
    const popupTiles = document.getElementById('popup_tiles');

    // Draw horizontal borders
    for (let i = 0; i < Math.floor(this.width / 32) - 1; i++) {
      this.context.drawImage(popupTiles, 8, 0, 8, 8, this.x + 28 + i * 32, this.y - 4, 32, 32);
      this.context.drawImage(popupTiles, 0, 16, 8, 8, this.x + 28 + i * 32, this.y + this.height - 28, 32, 32);
    }
    // Draw vertical borders
    for (let i = 0; i < Math.floor(this.height / 32) - 1; i++) {
      this.context.drawImage(popupTiles, 16, 16, 8, 8, this.x - 4, this.y + 28 + i * 32, 32, 32);
      this.context.drawImage(popupTiles, 8, 8, 8, 8, this.x + this.width - 28, this.y + 28 + i * 32, 32, 32);
    }
    // Draw corners
    this.context.drawImage(popupTiles, 0, 0, 8, 8, this.x - 4, this.y - 4, 32, 32);
    this.context.drawImage(popupTiles, 0, 8, 8, 8, this.x + this.width - 28, this.y - 4, 32, 32);
    this.context.drawImage(popupTiles, 8, 16, 8, 8, this.x - 4, this.y + this.height - 28, 32, 32);
    this.context.drawImage(popupTiles, 16, 8, 8, 8, this.x + this.width - 28, this.y + this.height - 28, 32, 32);
    // Draw gem
    this.context.drawImage(popupTiles, 16, 0, 8, 8, this.x + Math.floor(this.width / 2) - 16, this.y - 4, 32, 32);
  };

  init() {
    if (this.hidden) return;

    this._drawBackground();
    this.content && this.content.draw(this.x + 30, this.y + 30, this.width - 60, this.height - 120);
    this.action.hidden = false;

    if (this.action) {
      this.action.init();
    }
  }

  update() {
    if (this.hidden) return;

    this._drawBackground();
    this.content && this.content.draw(this.x + 30, this.y + 30, this.width - 60, this.height - 120);

    if (this.action) {
      this.action.hidden = false;
      this.action.update();
    }
  }

  show() {
    this.hidden = false;

    if (this.action) {
      this.action.listen();
    }
  }

  close() {
    this.hidden = true;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.action) {
      this.action.destroy();
    }
  }
}
