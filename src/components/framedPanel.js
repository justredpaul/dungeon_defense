import { getGlobal } from '../helpers/globals';

export const FRAMED_TILES = {
  outer: {
    top_left: [0, 0, 8, 8],
    top_right: [8, 0, 8, 8],
    bottom_left: [17, 0, 7, 7],
    bottom_right: [24, 0, 7, 7],
    separator_left: [32, 0, 5, 6],
    separator_right: [40, 0, 5, 6],
    top: [48, 0, 1, 4],
    bottom: [56, 0, 1, 8],
    left: [64, 0, 8, 1],
    right: [72, 0, 8, 1],
  },
  content: {
    idle: {
      top_left: [0, 8, 3, 3],
      top_right: [8, 8, 3, 3],
      bottom_right: [17, 8, 3, 3],
      bottom_left: [24, 8, 3, 3],
      bottom: [32, 8, 1, 3],
      left: [40, 8, 3, 1],
      right: [48, 8, 3, 1],
      top: [56, 8, 1, 3],
    },
    active: {
      top_left: [0, 16, 3, 3],
      top_right: [8, 16, 3, 3],
      bottom_right: [17, 16, 3, 3],
      bottom_left: [24, 16, 3, 3],
      bottom: [32, 16, 1, 3],
      left: [40, 16, 3, 1],
      right: [48, 16, 3, 1],
      top: [56, 16, 1, 3],
    },
  }
};

export class FramedPanel {
  constructor(x, y, width, height, separators, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.separators = separators;
    this.context = context;
  }

  _beforeDraw() {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  }

  _draw() {
    const scale = getGlobal('tilesScale');

    // Frame
    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...FRAMED_TILES.outer.top_left,
      this.x,
      this.y,
      8 * scale,
      8 * scale,
    );
    for (let i = 0; i < this.width - 8 * scale * 2; i++) {
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...FRAMED_TILES.outer.top,
        this.x + 8 * scale + i,
        this.y + scale,
        1 * scale,
        4 * scale,
      );
    }
    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...FRAMED_TILES.outer.top_right,
      this.x + this.width - 8 * scale,
      this.y,
      8 * scale,
      8 * scale,
    );

    for (let i = 0; i < this.height - 8 * scale * 2; i++) {
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...FRAMED_TILES.outer.left,
        this.x + scale,
        this.y + 8 * scale + i,
        8 * scale,
        1 * scale,
      );
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...FRAMED_TILES.outer.right,
        this.x + this.width - 9 * scale,
        this.y + 8 * scale + i,
        8 * scale,
        1 * scale,
      );
    }

    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...FRAMED_TILES.outer.bottom_left,
      this.x,
      this.y + this.height - 8 * scale,
      7 * scale,
      7 * scale,
    );
    for (let i = 0; i < this.width - 14 * scale; i++) {
      this.context.drawImage(
        document.getElementById('shop_panel_tiles'),
        ...FRAMED_TILES.outer.bottom,
        this.x + 7 * scale + i,
        this.y + this.height - 8 * scale,
        1 * scale,
        8 * scale,
      );
    }
    this.context.drawImage(
      document.getElementById('shop_panel_tiles'),
      ...FRAMED_TILES.outer.bottom_right,
      this.x + this.width - 7 * scale,
      this.y + this.height - 8 * scale,
      7 * scale,
      7 * scale,
    );

    this.context.fillStyle = '#62232f';
    this.context.fillRect(
      this.x + 4.5 * scale,
      this.y + 4.5 * scale,
      this.width - 9 * scale,
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
}
