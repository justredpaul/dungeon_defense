import { isCollide } from '../helpers/isCollide';
import { Fireball } from './fireball';
import { getGlobal } from '../helpers/globals';
import { ChestComponent } from './chest';
import { getRandomInRange } from '../helpers/getRandomInRange';

import level from '../data/level';

export class RowsComponent {
  constructor(context) {
    this.context = context;

    this.rows = new Array(6).fill(null).map(_ => []);
    this.vacantRows = [];

    for (let chestInRow of level.chests) {
      this.spawnChest({
        x: getGlobal('board_numbers').left_offset,
        row: chestInRow
      });
    }

    getGlobal('events')
      .subscribe('shooting_fireball', (args) => {
        this.spawnShot(new Fireball(args), args.row);
      });

    getGlobal('events').subscribe('spawn_chest', (args) => {
      this.spawnChest(args)
    });
    getGlobal('events').subscribe('steal_chest', (args) => {
      this.stealChest(args)
    });
  }

  _checkCollisions = (row) => {
    const shots = row.filter(({ type }) => type === 'shot');
    const defenders = row.filter(({ type }) => type === 'defender');
    const chests = row.filter(({ type }) => type === 'chest');
    const enemies = row.filter(({ type }) => type === 'enemy');

    enemies.forEach(enemy => {
      shots.forEach(shot => {
        if (isCollide(shot.shot, enemy.creature)) {
          shot.health = { value:  0 };
          enemy.receiveDamage(shot.damage, shot.damageType);

          if (shot.target.isDead()) {
            getGlobal('events').emit('enemy_die');
            shot.target.spawnLoot();
          }
        }
      });

      defenders.forEach(defender => {
        if (isCollide(defender.creature, enemy.creature)) {
          defender.startAttack(enemy);
          enemy.startAttack(defender);

          if (defender.isDead()) {
            enemy.stopAttack();
          }
          if (enemy.isDead()) {
            getGlobal('events').emit('enemy_die');
            enemy.spawnLoot();
            defender.stopAttack();
          }
        } else {
          if (defender.attack.canShoot && !defender.shooting && enemy.creature.x < getGlobal('board_numbers').fire_distance) {
            defender.startShooting(enemy);
          }
          if (enemy.attack.canShoot) {
            enemy.startShooting(defender);
          }
        }
      });

      chests.forEach(chest => {
        if (isCollide(chest.chest, enemy.creature)) {
          enemy.turn(1);
          enemy.takeChest();
        }
      });
    });
  };

  _beforeUpdateRow = (row) => {
    this._checkCollisions(row);
    row.forEach(item => item.beforeUpdate());
  };

  _updateRow(row) {
    row.forEach(item => item.update());
  }

  _removeDeadAndReturned() {
    this.rows = this.rows
      .map(row => row
        .filter(({ health, outOfBounds }) => (health === undefined || health.value > 0) && !outOfBounds)
      );
  }

  init() {}

  update() {
    this.rows.forEach(this._beforeUpdateRow);
    this._removeDeadAndReturned();
    this.rows.forEach(this._updateRow)
  }

  spawnCreature(creature, row) {
    this.rows[row - 1].push(creature);
  }

  spawnShot(shoot, row) {
    this.rows[row - 1].push(shoot);
  };

  spawnChest = ({ x, row }) => {
    const chest = new ChestComponent(row, this.context);
    chest.chest.x = x;

    this.rows[row].push(chest);
    this.vacantRows.push(row);
  };

  stealChest = ({ row }) => {
    this.rows[row] = this.rows[row].filter(({ type }) => type !== 'chest');
    this.vacantRows = this.vacantRows.filter(_row => row !== _row);

    this.rows[row].forEach(item => {
      if (item.type === 'enemy' && item.direction !== 1) {
        item.turn(1);
      }
    })
  };

  killCreature(creature) {
    this.rows.map(row => {
      const creatureIndex = row.indexOf(creature);
      if (~creatureIndex) {
        row.splice(creatureIndex, 1);
      }

      return row;
    })
  }

  getRandomVacantRow() {
    if (this.vacantRows.length === 0) return undefined;

    const rowIndex = getRandomInRange(0, this.vacantRows.length - 1);
    return this.vacantRows[rowIndex] + 1;
  }
}
