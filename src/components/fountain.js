import { Drawable } from 'baseClasses/drawable';
import { Animated } from 'baseClasses/animated';
import { getGlobal } from '../helpers/globals';

export class FountainComponent {
  constructor(x, y, context) {
    const tiles = document.getElementById('board_tiles');

    const fountainCapTile = [0, 0];
    const fountainBodyTile = [16, 0];
    const tileSize = 16;

    this.fountainAnimation = new Animated(
      [
        [16, 0],
        [32, 0],
        [48, 0],
      ],
      0.14,
      true,
      true,
    );
    this.fountainCap = new Drawable(
      tiles,
      x,
      y,
      tileSize,
      tileSize,
      fountainCapTile,
      context,
    );
    this.fountainBody = new Drawable(
      tiles,
      x,
      y + tileSize * getGlobal('tilesScale'),
      tileSize,
      tileSize * 2,
      fountainBodyTile,
      context,
      true,
    );
  }

  init() {
    this.fountainCap.draw();
    this.fountainBody.draw();
  }

  update() {
    this.fountainAnimation.update();
    this.fountainBody.tile = this.fountainAnimation.getFrame();
    this.fountainBody.draw();
  }
}
