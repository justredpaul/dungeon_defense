/**
 * Base class to iterate over tiles and create animation
 */
import { getGlobal } from '../helpers/globals';

export class Animated {
  constructor(frames, speed, loop, autostart, onAnimationEnd) {
    this.frames = frames;
    this.currentFrame = 0;
    this.speed = speed;
    this.loop = loop;
    this.onAnimationEnd = onAnimationEnd;

    this.started = !!autostart;
  }

  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
  }

  update() {
    if (!this.started) return;

    this.currentFrame += this.speed * getGlobal('gameSpeed');

    if (this.currentFrame >= this.frames.length) {
      if (this.onAnimationEnd) {
        this.onAnimationEnd();
        this.stop();
      }

      if (this.loop) {
        this.currentFrame = 0;
      }
    }
  }

  getFrame() {
    return this.frames[Math.floor(this.currentFrame)];
  }
}
