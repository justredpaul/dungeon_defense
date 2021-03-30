import { Drawable } from './drawable';
import { Throwing } from './throwing';
import { TILES, tileSet } from './tileAtlas';

export class Defender extends Drawable {
  constructor({
                type = 1,
                shooting = false,
                healing = false,
                health = 100,
                power = 1,
                row,
                tiles,
                ...args
              }) {
    super(args);

    this.type = type;
    this.row = row;
    this.shooting = shooting;
    this.healing = healing;
    this.health = health;
    this.maxHealth = health;
    this.power = power;
    this.tiles = tiles;
    this.isAttacking = false;

    this.frame = 0;
  }

  draw() {
    // Draw defender
    let [tileX, tileY, tileWidth, tileHeight, frames] = (this.isAttacking && Math.floor(this.frame) === 0)
      ? this.tiles[1] : this.tiles[0];
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX + Math.floor(this.frame) * tileWidth, tileY, tileWidth, tileHeight, this.x + 5, this.y - ((tileHeight * 4) - this.height), tileWidth * 4, tileHeight * 4);

    this.frame += this.isAttacking ? 0.18 : 0.12;

    if (this.frame > frames) {
      this.frame = 0;
    }

    // Draw they health
    [tileX, tileY, tileWidth, tileHeight] = this.maxHealth - this.health === 0
      ? TILES.HEALTH_BAR_FULL
      : this.health / this.maxHealth >= 0.75
        ? TILES.HEALTH_BAR_HIGH
        : this.health / this.maxHealth >= 0.5
          ? TILES.HEALTH_BAR_MEDIUM
          : TILES.HEALTH_BAR_LOW;
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX, tileY, tileWidth, tileHeight, this.x + 15, this.y - 20, 39, 10);
  }

  shoot() {
    if (this.shooting && !this.isAttacking) {
      window.dungeon_defense_game.army.throwings.push(new Throwing({
        power: this.power,
        x: this.x + 30,
        y: this.y + 30,
        width: 20,
        height: 20,
      }));

      this.health -= this.power / 10;
    }
  }

  heal() {
    if (this.healing && !this.isAttacking) {
      this.health = Math.min(this.maxHealth, this.health + this.maxHealth / 20);
    }
  }
}
