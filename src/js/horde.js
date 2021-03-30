export class Horde {
  enemies = [];

  addEnemy(enemy) {
    this.enemies.push(enemy);

    this.enemies.sort((a, b) => a.y - b.y);
  }

  drawHorde() {
    this.enemies.forEach(enemy => {
      enemy.move();
      enemy.draw();
    });
  }

  checkChests() {
    this.enemies.forEach(enemy => {
      if (enemy.x <= 64) {
        window.dungeon_defense_game.resources.hitChest(enemy.row);

        const vacantRows = window.dungeon_defense_game.resources.getVacantRows();
        const randomRow = vacantRows[Math.floor(Math.random() * vacantRows.length)];

        enemy.jumpToRow(randomRow);
      }
    });
  }
}
