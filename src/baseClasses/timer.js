import { getGlobal } from '../helpers/globals';

export class Timer {
  constructor(cb, speed, length, loop, autostart = false) {
    this.cb = cb;
    this.speed = speed;
    this.length = length;
    this.loop = loop;
    this.started = autostart;
    this.value = 0;

    if (autostart) {
      cb();
    }
  }

  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
  }

  tick() {
    if (!this.started) return;

    this.value += this.speed * getGlobal('gameSpeed');

    if (this.value >= this.length) {
      this.value = 0;
      this.cb();

      if (!this.loop) {
        this.stop();
      }
    }
  }

  reset() {
    this.value = 0;
  }
}
