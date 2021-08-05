/**
 * Base class to draw tile on a canvas
 */
import { getGlobal } from '../helpers/globals';

export class Drawable {
  constructor(tiles, x, y, width, height, tile, context, replaceOnDraw = false, scale) {
    this.tiles = tiles;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tile = tile;
    this.context = context;
    this.replaceOnDraw = replaceOnDraw;
    this.scale = scale || getGlobal('tilesScale');
  }

  beforeDraw() {
    if (this.replaceOnDraw) {
      this.context.clearRect(this.x - 1, this.y - 1, this.width * this.scale + 1, this.height * this.scale + 1);
    }
  }

  draw() {
    this.context.drawImage(this.tiles, ...this.tile, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
  }
}
