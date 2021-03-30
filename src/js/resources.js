import { Chest } from './chest';

export class Resources {
  constructor({ startValue }) {
    this.value = startValue;

    this.chests = new Array(6).fill(0).map((_, index) => new Chest({
      x: 0,
      y: (index + 1) * 64,
      width: 64,
      height: 64,
    }))
  }

  drawChests() {
    this.chests.forEach(chest => chest.draw());
  }

  spend(proposalValue) {
    if (this.value >= proposalValue) {
      this.value -= proposalValue;

      window.dungeon_defense_game.ui.uiGold.textContent = this.value;

      return true;
    }

    return false;
  }

  earn(additional) {
    this.value += additional;

    window.dungeon_defense_game.ui.uiGold.textContent = this.value;
  }

  hitChest(row) {
    if (this.chests[row - 1].isFull) {
      const fullChests = this.chests.reduce((acc, chest) => chest.isFull ? acc + 1 : acc, 0);
      this.chests[row - 1].isFull = false;
      this.spend(Math.floor(this.value / fullChests));

      if (this.chests.every(chest => !chest.isFull)) {
        window.dungeon_defense_game.endings.lose();
      }
    }
  }

  getVacantRows() {
    const vacantRows = [];

    window.dungeon_defense_game.resources.chests
      .forEach((chest, index) => {
        if (chest.isFull) {
          vacantRows.push(index + 1);
        }
      });

    return vacantRows;
  }
}
