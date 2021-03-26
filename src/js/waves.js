import { Enemy } from './enemy';

const messages = [
  ['First wave', 'Be ready!'],
  ['Second wave', 'The more is coming!'],
  ['Last wave'],
  ['Ancient evil is here!'],
];

const enemyPacks = [
  ['Skeleton'],
  ['Skeleton', 'Slime'],
  ['Slime', 'Chort', 'Skeleton'],
  ['Boss'],
];

const enemyCount = [20, 50, 75, 1];

export class Waves {
  currentWave = null;
  currentCount = 0;
  allWavesIsSpawned = false;

  constructor() {
    this.waves = [];

    for (let i = 0; i < enemyPacks.length; i++) {
      this.waves.push({
        message: messages[i],
        enemyPack: enemyPacks[i],
        enemyCount: enemyCount[i],
      });
    }
  }

  _declareWave() {
    window.dungeon_defense_game.ui.uiWaves.style.visibility = 'visible';
    const messageLines = window.dungeon_defense_game.ui.uiWaves.querySelectorAll('.wave__message');

    messageLines.forEach((line, index) => line.textContent = this.waves[this.currentWave].message[index]);

    setTimeout(() => {
      window.dungeon_defense_game.ui.uiWaves.style.visibility = 'hidden';
    }, 3000);
  }

  start() {
    this.currentWave = 0;

    this._declareWave();
  }

  spawn() {
    if (this.currentWave !== null && window.dungeon_defense_game.frame % 100 === 0) {

      const vacantRows = [];
      window.dungeon_defense_game.resources.chests
        .forEach((chest, index) => {
          if (chest.isFull) {
            vacantRows.push(index + 1);
          }
        });

      const randomRow = vacantRows[Math.floor(Math.random() * vacantRows.length)];

      const { enemyPack } = this.waves[this.currentWave];
      const enemyType = enemyPack[Math.floor(Math.random() * (enemyPack.length))];

      window.dungeon_defense_game.horde.addEnemy(new Enemy({
        type: enemyType,
        row: randomRow,
        width: 64,
        height: 64,
      }));
      this.currentCount++;

      if (this.currentCount === this.waves[this.currentWave].enemyCount) {
        this.nextWave();
      }
    }
  }

  nextWave() {
    if (this.currentWave < this.waves.length - 1) {
      this.currentWave++;
      this.currentCount = 0;

      this._declareWave();
    } else {
      this.currentWave = null;
      this.allWavesIsSpawned = true;
    }
  }
}
