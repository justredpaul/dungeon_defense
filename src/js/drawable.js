export class Drawable {
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    window.dungeon_defense_game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
