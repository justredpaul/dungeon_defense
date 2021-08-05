import { getGlobal } from '../helpers/globals';
import { FRAMED_TILES } from './framedPanel';

export class ShopCell {
  constructor(x, y, width, height, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;

    this.active = false;
  }

  _beforeDraw() {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  }

  _draw() {
    const scale = getGlobal('tilesScale');

    const tiles = FRAMED_TILES.content[this.active ? 'active' : 'idle'];

    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...tiles.top_left,
      this.x + 5 * scale,
      this.y + 5 * scale,
      3 * scale,
      3 * scale,
    );
    for (let i = 0; i < this.width - 8 * scale * 2; i++) {
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...tiles.top,
        this.x + 8 * scale + i,
        this.y + 5 * scale,
        1 * scale,
        3 * scale,
      );
    }
    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...tiles.top_right,
      this.x + this.width - 8 * scale,
      this.y + 5 * scale,
      3 * scale,
      3 * scale,
    );
    for (let i = 0; i < this.height - 5 * scale * 2; i++) {
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...tiles.left,
        this.x + 5 * scale,
        this.y + 8 * scale + i,
        3 * scale,
        1 * scale,
      );
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...tiles.right,
        this.x + this.width - 8 * scale,
        this.y + 8 * scale + i,
        3 * scale,
        1 * scale,
      );
    }
    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...tiles.bottom_left,
      this.x + 5 * scale,
      this.y + this.height - 3 * scale,
      3 * scale,
      3 * scale,
    );
    for (let i = 0; i < this.width - 8 * scale * 2; i++) {
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...tiles.bottom,
        this.x + 8 * scale + i,
        this.y + this.height - 3 * scale,
        1 * scale,
        3 * scale,
      );
    }
    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...tiles.bottom_right,
      this.x + this.width - 8 * scale,
      this.y + this.height - 3 * scale,
      3 * scale,
      3 * scale,
    );

    this.context.fillStyle = this.active ? '#d19b6d' : '#d3bfa9';
    this.context.fillRect(
      this.x + 8 * scale,
      this.y + 8 * scale,
      this.width - 16 * scale,
      this.height - 10.5 * scale);
  }

  init() {
    this._draw();
  }

  beforeUpdate() {
    this._beforeDraw();
  }

  update() {
    this._draw()
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}
