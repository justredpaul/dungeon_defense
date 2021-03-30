export class MouseController {
  width = 0.1;
  height = 0.1;

  constructor(onGridClick, onMove) {
    this.canvasPosition = window.dungeon_defense_game.canvas.getBoundingClientRect();

    const updateCoordinates = (x, y) => {
      this.mouseX = x;
      this.mouseY = y;
    };

    window.dungeon_defense_game.canvas.addEventListener('mousemove', e => {
      const x = e.x - this.canvasPosition.left;
      const y = e.y - this.canvasPosition.top;

      if (y < 64 || y > 7 * 64) return;
      if (x < 64) return;

      const gridPositionX = x - (x % 64);
      const gridPositionY = y - (y % 64);

      if (window.dungeon_defense_game.army.isOccupied(gridPositionX, gridPositionY)) return;

      updateCoordinates(x, y);

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
