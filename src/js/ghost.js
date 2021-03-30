import { Drawable } from './drawable';
import { tileSet } from './tileAtlas';

export class Ghost extends Drawable {
  constructor({ tile, type, shooting, healing, health, power, price, tiles, row, ...args }) {
    super(args);

    // Own props
    this.tile = tile;
    this.price = price;

    // Defender props
    this.type = type;
    this.shooting = shooting;
    this.healing = healing;
    this.health = health;
    this.power = power;
    this.tiles = tiles;
    this.row = row;
  }

  create() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      type: this.type,
      shooting: this.shooting,
      healing: this.healing,
      health: this.health,
      power: this.power,
      tiles: this.tiles,
      row: this.row,
    }
  }

  draw() {
    let [tileX, tileY, tileWidth, tileHeight] = this.tile;
    // window.dungeon_defense_game.ctx.drawImage(tileSet, tileX, tileY, tileWidth, tileHeight, this.x, this.y, tileWidth * 4, tileHeight * 4);
    window.dungeon_defense_game.ctx.globalAlpha = 0.5;
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX, tileY, tileWidth, tileHeight, this.x + 5, this.y - ((tileHeight * 4) - this.height), tileWidth * 4, tileHeight * 4);
    window.dungeon_defense_game.ctx.globalAlpha = 1;
  }
}
