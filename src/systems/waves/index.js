import { System } from 'baseClasses/system';

import level from '../../data/level';
import { Timer } from '../../baseClasses/timer';
import { getRandomInRange } from '../../helpers/getRandomInRange';
import { getGlobal, getSystem, setGlobal, setSystem } from '../../helpers/globals';
import creatures from '../../data/creatures';

export class WaveSystem extends System {
  constructor(wavesData) {
    super();

    this.waves = wavesData;
    this.currentWave = 0;

    this.enemies = this.waves[this.currentWave].enemies;
    this.enemiesRemains = this.waves
      .reduce((sum, wave) => sum + wave.enemies
        .reduce((_sum, enemy) => _sum + enemy.count, 0), 0);

    this.spawnTimer = new Timer(
      this._spawnEnemy,
      this.waves[this.currentWave].spawnSpeed,
      1,
      true,
      true,
    );

    getGlobal('events').subscribe('enemy_return', ({ name }) => {
      const enemy = this.enemies.find(({ name: _name }) => name === _name);

      if (enemy) {
        enemy.count++;
      } else {
        this.enemies.push({ name, count: 1 });
      }
    });
    getGlobal('events').subscribe('enemy_die', () => {
      this.enemiesRemains--;

      if (this.enemiesRemains === 0) {
        getSystem('popups').showPopup('win');
      }
    });
  }

  _spawnEnemy = () => {
    let randomEnemyIndex = getRandomInRange(0, this.enemies.length - 1);
    let randomEnemy = this.enemies[randomEnemyIndex];

    if (!randomEnemy || randomEnemy.count === 0) return;

    let enemyCreature = creatures[randomEnemy.name];
    getSystem('creatures')
      .spawnEnemy({
          ...enemyCreature,
          x: getGlobal('board_numbers').spawn_point,
        },
        getSystem('creatures').rows.getRandomVacantRow(),
      );

    randomEnemy.count--;

    if (randomEnemy.count === 0) {
      this.enemies.splice(randomEnemyIndex, 1);

      if (this.enemies.length === 0) this.nextWave();
    }
  };

  nextWave() {
    if (this.currentWave < this.waves.length - 1) {
      this.currentWave++;

      this.enemies = this.waves[this.currentWave].enemies;
    } else {
      setGlobal('level_complete', true);
    }
  }

  update() {
    super.update();

    this.spawnTimer.tick();
  }
}

export const initWaveSystem = () => {
  const waves = new WaveSystem(level.waves);

  setSystem('waves', waves);
};
