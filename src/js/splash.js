import { Drawable } from './drawable';
import { TILES, tileSet } from './tileAtlas';

export class Splash extends Drawable {
  constructor(args) {
    super(args);

    this.frame = 0;
  }

  draw() {
    let [tileX, tileY, tileWidth, tileHeight, frames] = TILES.FIRE_HIT;
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX + Math.floor(this.frame) * tileWidth, tileY, tileWidth, tileHeight, this.x + 5, this.y - tileHeight * 2, tileWidth * 4, tileHeight * 4);

    this.frame += 0.5;

    if (this.frame > frames) {
      this.remove = true;
    }
  }
}
