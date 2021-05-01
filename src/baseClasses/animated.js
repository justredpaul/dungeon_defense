/**
 * Base class to iterate over tiles and create animation
 */
export class Animated {
  constructor(frames, speed, top) {
    this.frames = frames;
    this.currentFrame = 0;
    this.speed = speed;
    this.top = top;
  }

  update() {
    this.currentFrame += this.speed * window.dungeon_defense_game.gameSpeed;

    if (this.currentFrame >= this.top) {
      this.currentFrame = 0;
    }
  }

  getFrame() {
    return this.frames[Math.floor(this.currentFrame)];
  }
}
