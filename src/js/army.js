import { Defender } from './defender';
import { CANVAS_WIDTH } from './canvas';
import { MouseController } from './mouseController';
import { Splash } from './splash';
import { TILES } from './tileAtlas';

import shortSword from 'url:../assets/images/short_sword.png';
import sword from 'url:../assets/images/sword.png';
import fireball from 'url:../assets/images/fireball.png';

export const DEFENDERS = [
  {
    type: 'Elf',
    shooting: false,
    health: 70,
    price: 50,
    power: 10,
    tiles: [TILES.DEFENDER_1_IDLE, TILES.DEFENDER_1_HIT],
    weapon: shortSword,
  },
  {
    type: 'Knight',
    shooting: false,
    price: 200,
    health: 250,
    power: 50,
    tiles: [TILES.DEFENDER_2_IDLE, TILES.DEFENDER_2_HIT],
    weapon: sword,
  },
  {
    type: 'Mage',
    shooting: true,
    price: 100,
    health: 50,
    power: 30,
    tiles: [TILES.DEFENDER_3_IDLE, TILES.DEFENDER_3_HIT],
    weapon: fireball,
  },
]

export class Army {
  defenders = [];
  throwings = [];
  splashes = [];

  ghost = null;

  constructor() {
    new MouseController(
      () => {
        if (this.ghost && window.dungeon_defense_game.resources.spend(this.ghost.price)) {
          this.createDefender();
        }
      },
      (x, y) => {
        if (this.ghost) {
          this.ghost.x = x;
          this.ghost.y = y;
          this.ghost.row = (y / 64);
        }
      }
    );
  }

  createDefender() {
    this.defenders.push(new Defender(this.ghost.create()));

    this.ghost = null;

    this.defenders.sort((a, b) => a.y - b.y);
  }

  drawArmy() {
    this.defenders.forEach(defender => defender.draw());
    this.throwings.forEach(throwing => {
      throwing.move();
      throwing.draw();

      if (throwing.x > CANVAS_WIDTH - 30) {
        throwing.remove = true;
      }
    });
    this.splashes.forEach(splash => splash.draw());

    this.throwings = this.throwings.filter(({ remove }) => !remove);
    this.splashes = this.splashes.filter(({ remove }) => !remove);

    this.ghost && this.ghost.draw();
  }

  checkCollision() {
    const { horde, resources } = window.dungeon_defense_game;

    if (!this.defenders.length || !horde.enemies.length) return;

    for (let i = 0; i < this.defenders.length; i++) {
      let defender = this.defenders[i];

      for (let j = 0; j < horde.enemies.length; j++) {
        let enemy = horde.enemies[j];

        if (isCollide(defender, enemy)) {
          enemy.isAttacking = true;
          enemy.health -= defender.power / 4 * 0.18;
          defender.isAttacking = true;
          defender.health -= enemy.power / 4 * 0.18;
        }

        if (defender.health < 0) {
          defender.dead = true;
          enemy.isAttacking = false;
        }

        if (enemy.health < 0) {
          resources.earn(enemy.gold);
          enemy.dead = true;
          defender.isAttacking = false;
        }
      }

      horde.enemies = horde.enemies.filter(({ dead }) => !dead);

      if (horde.enemies.length === 0 && window.dungeon_defense_game.waves.allWavesIsSpawned) {
        window.dungeon_defense_game.endings.win();
        return;
      }
    }

    this.defenders = this.defenders.filter(({ dead }) => !dead);

    for (let throwing of this.throwings) {
      for (let enemy of horde.enemies) {
        if (isCollide(throwing, enemy)) {
          enemy.health -= throwing.power;
          throwing.remove = true;

          this.splashes.push(new Splash({
            x: throwing.x,
            y: throwing.y,
            width: 20,
            height: 20,
          }));
        }
      }
    }

    this.throwings = this.throwings.filter(({ remove }) => !remove);
  }

  throwAll() {
    if (window.dungeon_defense_game.frame % 250 === 0) {
      this.defenders.forEach(defender => {
        if (window.dungeon_defense_game.horde.enemies.some(({ row }) => row === defender.row)) {
          defender.shoot();
        }
      });
    }
  }
}

const isCollide = (first, second) => {
  return !(first.x >= second.x + second.width
    || first.x + first.width <= second.x
    || first.y >= second.y + second.height
    || first.y + first.height <= second.y);
}
