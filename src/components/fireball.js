import { Shot } from '../baseClasses/shot';
import { Animated } from '../baseClasses/animated';

import shots from '../data/shots';
import { Drawable } from '../baseClasses/drawable';

export class Fireball extends Shot {
  constructor(args) {
    super({ ...args, damageType: 'fire' });

    const fireballData = shots.fireball;
    this.animation = new Animated(
      fireballData.tiles.frames,
      fireballData.tiles.speed,
      true,
      true,
    );

    this.shot = new Drawable(
      document.getElementById('fireball_tiles'),
      this.x,
      this.y,
      fireballData.size.width,
      fireballData.size.height,
      this.animation.getFrame(),
      this.context,
      true,
    );
  }

  beforeUpdate() {
    this.shot.beforeDraw();
  }

  move() {
    super.move();

    this.shot.x = this.x;
  }

  update() {
    super.update();

    this.animation.update();
    this.shot.tile = this.animation.getFrame();
    this.shot.draw();
  }
}
