import { Animated } from './animated';
import { Drawable } from './drawable';
import { isMobile } from '../helpers/isMobile';
import { getHealthBarTile } from '../helpers/getHealthBar';
import { getGoldToSpawn } from '../helpers/getGoldToSpawn';
import { Timer } from './timer';
import { getYFromRow } from '../helpers/getYFromRow';
import { getGlobal } from '../helpers/globals';
import { Health } from '../components/health';

export class Creature {
  constructor({
                x,
                row,
                health,
                attack,
                weapon,
                speed,
                direction,
                name,
                tiles,
                size,
                type,
                loot,
              }, context) {
    this.type = type;
    this.row = row;
    this.health = { ...health };
    this.maxHealth = +health.value;
    this.attack = attack;
    this.weapon = weapon;
    this.speed = speed;
    this.direction = direction;
    this.name = name;
    this.tiles = tiles;
    this.size = size;
    this.loot = loot;
    this.context = context;

    this.isAttacking = false;
    this.isMoving = false;
    this.carryChest = false;

    this._setupAnimation();

    const tilesScale = getGlobal('tilesScale');
    const y = getYFromRow(row) - (size.height * tilesScale + 3 * tilesScale);

    this.chest = new Drawable(
      document.getElementById('chest'),
      getGlobal('board_numbers').left_offset + x + size.width + 5,
      getGlobal('board_numbers').top_offset + y - 5,
      16,
      16,
      [0, 0],
      context,
      true,
      0.6 * getGlobal('tilesScale')
    );

    this.creature = new Drawable(
      document.getElementById(tiles.imageName),
      getGlobal('board_numbers').left_offset + x,
      getGlobal('board_numbers').top_offset + y,
      size.width,
      size.height,
      this.animation.getFrame(),
      context,
      true,
    );

    this.healthDisplay = new Health(
      getGlobal('board_numbers').left_offset + x,
      getGlobal('board_numbers').top_offset + y + this.creature.height * tilesScale - 20 * tilesScale,
      size.width,
      health.value,
      context
    );

    if (weapon) {
      this.weaponAnimation = new Animated(weapon.tiles.frames.idle, weapon.tiles.speed, true, true);
      this.weaponDisplay = new Drawable(
        document.getElementById(weapon.name + '_tiles'),
        getGlobal('board_numbers').left_offset + x + size.width * tilesScale * 0.45,
        getGlobal('board_numbers').top_offset + y,
        weapon.size.width,
        weapon.size.height,
        this.weaponAnimation.getFrame(),
        context,
        true,
        isMobile() ? 1.8 : 3
      );
    }

    if (attack.canShoot) {
      this.shootingTimer = new Timer(() => {
        if (this.shootingTarget.health.value <= 0) {
          this.stopShooting();
          return;
        }

        getGlobal('events').emit('shooting_fireball', {
          x: this.creature.x + this.creature.width,
          y: this.creature.y + this.creature.height * 0.3,
          row: this.row,
          direction: this.direction,
          target: this.shootingTarget,
          source: this,
          damage: attack.shootDamage,
          context: this.context,
        });
      }, attack.shootSpeed, 1, true, false);
    }
  }

  _setupAnimation = () => {
    const state = this.isMoving ? 'run' : 'idle';
    const direction = ~this.direction ? 'right' : 'left';
    this.animation = new Animated(this.tiles.frames[`${state}_${direction}`], this.tiles.speed, true, true);
  };

  move() {
    if (!this.isMoving) return;

    let amount = this.speed * this.direction * getGlobal('gameSpeed');

    if (isMobile()) {
      amount *= 0.8;
    }

    if (this.carryChest) {
      amount /= 2;
    }

    this.chest.x += amount;
    this.creature.x += amount;
    this.healthDisplay.move( amount);
  }

  beforeUpdate() {
    this.chest.beforeDraw();
    this.creature.beforeDraw();
    this.healthDisplay.beforeUpdate();
    if (this.weaponDisplay) {
      this.weaponDisplay.beforeDraw();
    }

    this.outOfBounds = this.creature.x > getGlobal('board_numbers').left_offset + getGlobal('board_numbers').spawn_point;

    if (this.outOfBounds) {
      getGlobal('events').emit('enemy_return', { name: this.name, withChest: this.carryChest });
    }

    const isMoving = !!this.speed && !this.isAttacking && !this.outOfBounds;
    if (isMoving !== this.isMoving) {
      this.isMoving = isMoving;
      this._setupAnimation();
    }

    this.healthDisplay.tile = getHealthBarTile(this.health.value, this.maxHealth);
  }

  update() {
    this.move();

    if (this.carryChest) {
      this.chest.draw();
    }

    this.animation.update();
    this.creature.tile = this.animation.getFrame();
    this.creature.draw();

    if (this.weaponDisplay) {
      this.weaponAnimation.update();
      this.weaponDisplay.tile = this.weaponAnimation.getFrame();
      this.weaponDisplay.draw();
    }

    this.healthDisplay.update();
    if (this.attackTimer) {
      this.attackTimer.tick();
    }

    if (this.shootingTimer) {
      this.shootingTimer.tick();
    }
  }

  startAttack(target) {
    if (this.isAttacking) return;

    if (target.creature.x < this.creature.x) {
      this.turn(-1);
    } else {
      this.turn(1);
    }

    this.isAttacking = true;
    this.attackTarget = target;
    this.attackTimer = new Timer(() => {
      this.attackTarget.receiveDamage(this.attack.damage, this.attack.damageType);
    }, this.attack.speed, 1,true, true);

    if (this.weapon) {
      this.weaponAnimation = new Animated(
        this.weapon.tiles.frames.attack,
        this.weapon.tiles.speed,
        true,
        true
      );
    }

    if (this.shooting) {
      this.stopShooting();
    }
  }

  stopAttack() {
    if (!this.isAttacking) return;

    this.isAttacking = false;
    this.attackTimer.stop();

    if (this.weapon) {
      this.weaponAnimation = new Animated(
        this.weapon.tiles.frames.idle,
        this.weapon.tiles.speed,
        true,
         true
      );
    }
  }

  startShooting(target) {
    if (this.shooting) return;

    this.shooting = true;
    this.shootingTarget = target;
    this.shootingTimer.start();
  }

  stopShooting() {
    this.shooting = false;
    this.shootingTimer.stop();
    this.shootingTimer.value = 1;
    this.shootingTarget = null;
  }

  receiveDamage(damage, type) {
    let multiplier = (this.health.vulnerability || []).includes(type)
      ? 1.5
      : (this.health.resistance || []).includes(type)
        ? 0.5
        : 1;
    this.health.value -= damage * multiplier;
    this.healthDisplay.receiveDamage(damage * multiplier);
  }

  isDead() {
    return this.health.value <= 0;
  }

  spawnLoot() {
    if (this.carryChest) {
      getGlobal('events').emit('spawn_chest', { x: this.creature.x, row: this.row - 1 });
    }

    if (!this.loot) return;

    if (this.loot.gold) {
      getGlobal('events').emit('spawn_gold', { goldValue: getGoldToSpawn(this.loot.gold) });
    }

    this.loot = null;
  }

  turn(direction) {
    if (!direction) {
      this.direction *= -1;
    } else {
      this.direction = direction;
    }

    this._setupAnimation();
  }

  takeChest() {
    this.carryChest = true;
    getGlobal('events').emit('steal_chest', { row: this.row - 1 });
  }
}
