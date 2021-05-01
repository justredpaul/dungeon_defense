import { Drawable } from 'baseClasses/drawable';
import { Animated } from 'baseClasses/animated';

export class FountainComponent {
  constructor(x, y, context) {
    const tiles = document.getElementById('board_tiles');

    const fountainCapTile = [0, 0, 16, 16];
    const fountainBodyTile = [16, 0, 16, 32];
    const tileSize = 16 * window.dungeon_defense_game.tilesScale;

    this.fountainAnimation = new Animated(
      [[16, 0, 16, 32], [32, 0, 16, 32], [48, 0, 16, 32]],
      0.14,
      3);
    this.fountainCap = new Drawable(tiles, x, y, tileSize, tileSize, fountainCapTile, context);
    this.fountainBody = new Drawable(tiles, x, y + tileSize, tileSize, tileSize * 2, fountainBodyTile, context, true);
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
