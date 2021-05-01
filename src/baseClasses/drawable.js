/**
 * Base class to draw tile on a canvas
 */
export class Drawable {
  constructor(tiles, x, y, width, height, tile, context, replaceOnDraw = false) {
    this.tiles = tiles;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tile = tile;
    this.context = context;
    this.replaceOnDraw = replaceOnDraw;
  }

  draw() {
    if (this.replaceOnDraw) {
      this.context.clearRect(this.x, this.y, this.width, this.height);
    }

    this.context.drawImage(this.tiles, ...this.tile, this.x, this.y, this.width, this.height);
  }
}
