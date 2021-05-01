import { Drawable } from './drawable';
import { CANVAS_WIDTH } from './canvas';
import { TILES, tileSet } from './tileAtlas';

export const ENEMIES = [
  {
    type: 'Skeleton',
    health: 40,
    power: 10,
    tiles: [TILES.ENEMY_1_IDLE, TILES.ENEMY_1_HIT],
    speed: 0.8,
    gold: 35,
    fireResist: false,
  },
  {
    type: 'Slime',
    health: 100,
    power: 20,
    tiles: [TILES.ENEMY_3_IDLE, TILES.ENEMY_3_HIT],
    speed: 0.3,
    gold: 50,
    fireResist: false,
  },
  {
    type: 'Chort',
    health: 75,
    power: 50,
    tiles: [TILES.ENEMY_2_IDLE, TILES.ENEMY_2_HIT],
    speed: 0.6,
    gold: 75,
    fireResist: true,
  },
  {
    type: 'Boss',
    health: 400,
    power: 90,
    tiles: [TILES.BOSS_IDLE, TILES.BOSS_HIT],
    speed: 0.5,
    gold: 250,
    fireResist: true,
  },
];

export class Enemy extends Drawable {
  constructor({ type, row, ...args }) {
    super(args);

    const {
      speed, health, power, tiles, gold, fireResist,
    } = ENEMIES.find(enemy => enemy.type === type) || ENEMIES[0];

    this.type = type;
    this.x = CANVAS_WIDTH;
    this.y = row * 64;
    this.tiles = tiles;
    this.row = row;
    this.speed = speed;
    this.isAttacking = false;
    this.gold = Math.floor(Math.random() * gold / 2 + gold / 2);
    this.health = health;
    this.maxHealth = health;
    this.power = power;
    this.fireResist = fireResist;

    this.frame = 0;
  }

  draw() {
    // Draw they health
    let [tileX, tileY, tileWidth, tileHeight] = this.maxHealth - this.health === 0
      ? TILES.HEALTH_BAR_FULL
      : this.health / this.maxHealth >= 0.75
        ? TILES.HEALTH_BAR_HIGH
        : this.health / this.maxHealth >= 0.5
          ? TILES.HEALTH_BAR_MEDIUM
          : TILES.HEALTH_BAR_LOW;
    if (this.type !== 'Boss') {

      window.dungeon_defense_game.ctx.drawImage(tileSet, tileX, tileY, tileWidth, tileHeight, this.x + 15, this.y - 20, 39, 10);
    } else {
      window.dungeon_defense_game.ctx.drawImage(tileSet, tileX, tileY, tileWidth, tileHeight, 6 * 64, 32, tileWidth * 3, tileHeight * 3);
    }

    // Draw enemy
    [tileX, tileY, tileWidth, tileHeight, frames] = this.isAttacking
      ? this.tiles[1] : this.tiles[0];
    const y = this.y - (tileHeight * 4 - this.height);
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX + Math.floor(this.frame) * tileWidth, tileY, tileWidth, tileHeight, this.x + 15, y, tileWidth * 4, tileHeight * 4);

    this.frame += 0.16 * window.dungeon_defense_game.gameSpeed;

    if (this.frame > frames) {
      this.frame = 0;
    }
  }

  move() {
    if (!this.isAttacking) {
      this.x -= this.speed * window.dungeon_defense_game.gameSpeed;
    }

    if (this.x <= 64) {
      this.isAttacking = true;
    }
  }

  jumpToRow(row) {
    this.row = row;
    this.x = CANVAS_WIDTH;
    this.y = row * 64;
    this.isAttacking = false;
  }
}
