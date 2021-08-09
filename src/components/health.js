import { getGlobal } from '../helpers/globals';
import { Timer } from '../baseClasses/timer';

export class Health {
  constructor(x, y, width, value, context) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.width = width * getGlobal('tilesScale');
    this.value = value;
    this.maxValue = value;
    this.context = context;
  }

  clear() {
    this.context.clearRect(Math.round(this.x), this.y, this.width, 6);
  }

  draw() {
    const healthPercentage = Math.floor(this.value / this.maxValue * 100) / 100;

    this.context.save();

    this.context.fillStyle = 'rgba(255, 0, 0, 1)';
    this.context.fillRect(Math.round(this.x) + 5, this.y, (this.width - 10) * healthPercentage, 6);

    if (this.damage) {
      const damagePercentage = Math.floor(this.damage / this.maxValue * 100) / 100;
      this.context.fillStyle = 'rgba(255, 255, 255, 1)';
      this.context.fillRect(Math.round(this.x) + 5 + (this.width - 10) * healthPercentage, this.y, (this.width - 10) * damagePercentage, 6);
    }

    this.context.restore();
  }

  move(amount) {
    this.x += amount
  }

  receiveDamage(amount) {
    this.value -= amount;
    this.damage = amount;

    this.damageDisplayTimer = new Timer(() => {
      this.damage = 0;
    }, 0.01, 1, false, false);
    this.damageDisplayTimer.start();
  }

  restore(amount) {
    this.value = Math.min(this.maxValue * 0.7, this.value + amount);
  }

  beforeUpdate() {
    this.clear();
  }

  update() {
    if (this.damageDisplayTimer) {
      this.damageDisplayTimer.tick();
    }
    if (this.value < this.maxValue) {
      this.draw();
    }
  }
}
