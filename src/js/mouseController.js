export class MouseController {
  width = 0.1;
  height = 0.1;

  constructor(onGridClick, onMove) {
    this.canvasPosition = window.dungeon_defense_game.canvas.getBoundingClientRect();

    const updateCoordinates = (x, y) => {
      this.mouseX = x;
      this.mouseY = y;
    }

    window.dungeon_defense_game.canvas.addEventListener('mousemove', e => {
      const y = e.y - this.canvasPosition.top;

      if (y < 64 || y > 7 * 64) return;

      updateCoordinates(e.x - this.canvasPosition.left, y);

      const gridPositionX = this.mouseX - (this.mouseX % 64);
      const gridPositionY = this.mouseY - (this.mouseY % 64);

      onMove(gridPositionX, gridPositionY);
    });

    window.dungeon_defense_game.canvas.addEventListener('click', () => {
      const gridPositionX = this.mouseX - (this.mouseX % 64);
      const gridPositionY = this.mouseY - (this.mouseY % 64);

      if (gridPositionY >= 64) {
        onGridClick(gridPositionX, gridPositionY);
      }
    });
  }
}
