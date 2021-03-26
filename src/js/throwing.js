import { Drawable } from './drawable';
import { TILES, tileSet } from './tileAtlas';
import { CANVAS_WIDTH } from './canvas';

export class Throwing extends Drawable {
  constructor({ power, ...args }) {
    super(args);

    this.power = power;
    this.speed = 5;
    this.frame = 0;
    this.line = 1;
  }

  draw() {
    let [tileX, tileY, tileWidth, tileHeight, frames] = TILES[`FIREBALL_${this.line}`];
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX + Math.floor(this.frame) * tileWidth, tileY, tileWidth, tileHeight, this.x + 5, this.y - ((tileHeight * 4) - this.height), tileWidth * 4, tileHeight * 4);

    this.frame += 0.2;

    if (this.frame > frames) {
      this.frame = 0;

      this.line++;

      if (this.line >= 4) {
        this.line = 1;
      }
    }
  }

  move() {
    this.x += this.speed;

    if (this.x > CANVAS_WIDTH - this.width * 6) {
      this.remove = true;
    }
  }
}
