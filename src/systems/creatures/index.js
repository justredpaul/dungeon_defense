import { System } from 'baseClasses/system';
import { Creature } from 'baseClasses/creature';
import { getGlobal, getSystem, setSystem } from 'helpers/globals';
import { isCollide } from 'helpers/isCollide';
import { RowsComponent } from '../../components/rows';

import creatures from '../../data/creatures';
import weapons from '../../data/weapons';
import level from '../../data/level';

export class CreaturesSystem extends System {
  constructor() {
    super();

    this.canvas = document.querySelector('.canvas#creatures');
    this.canvas.width = getGlobal('canvasSize').width;
    this.canvas.height = getGlobal('canvasSize').height;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;

    this.rows = new RowsComponent(this.context);

    this.chestsLost = 0;

    getGlobal('events').subscribe('enemy_return', ({ withChest }) => {
      if (withChest) {
        this.chestsLost++;
      }

      if (this.chestsLost === level.chests.length) {
        getGlobal('events').emit('lose');
        getSystem('popups').showPopup('lose');
      }
    });
  }

  addGhost(creature) {
    this.ghost = creature;

    if (creature.weapon) {
      this.ghost.weapon = weapons[creature.weapon];
    }
  }

  spawnDefender({ x, row }) {
    if (!this.ghost) return;

    if (x !== undefined) {
      this.ghost.x = x * (16 * getGlobal('tilesScale'));
    }

    if (row !== undefined) {
      this.ghost.row = row;
    }

    getGlobal('gold').spend(this.ghost.cost);
    this.rows.spawnCreature(new Creature(this.ghost, this.context), this.ghost.row);
    this.ghost = null;
    getGlobal('events').emit('ghost_spawned');
  }

  spawnEnemy(enemy, row) {
    if (!row) return;

    this.rows.spawnCreature(new Creature({ ...enemy, direction: -1, row }, this.context), row);
  }

  kill(creature) {
    this.rows.killCreature(creature);
  }

  isOccupied(x, row) {
    let result = false;
    const ghostParams = {
      x: getGlobal('board_numbers').left_offset + x * (16 * getGlobal('tilesScale')) + 4,
      width: 10
    };

    this.rows.rows[row - 1].forEach(creature => {
      if (creature.type !== 'enemy' && creature.type !== 'defender') return;

      if (isCollide(creature.creature, ghostParams)) {
        result = true;
      }
    });

    return result;
  }

  update() {
    this.rows.update();
  }
}

export const initCreatures = () => {
  setSystem('creatures', new CreaturesSystem());

  getGlobal('events').subscribe(
    'floor_tile_click',
    (args) => getSystem('creatures').spawnDefender(args)
  );
};
