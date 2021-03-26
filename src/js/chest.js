import { Drawable } from './drawable';
import { TILES, tileSet } from './tileAtlas';

export class Chest extends Drawable {
  constructor(args) {
    super(args);

    this.isFull = true;
  }

  draw() {
    let [tileX, tileY, tileWidth, tileHeight] = this.isFull ? TILES.CHEST_FULL : TILES.CHEST_EMPTY;
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX, tileY, tileWidth, tileHeight, this.x + 20, this.y, this.width * 0.66, this.height);
  }
}
