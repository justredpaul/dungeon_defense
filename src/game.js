import { preloadGraphics } from './helpers/preloadGraphics';

import { initBoard } from './systems/board';
import { initUi } from './systems/ui';
import { initDebug } from './systems/debug';
import { initPopups } from './systems/popup';
import { initCreatures } from './systems/creatures';
import { initEvents } from './systems/events';
import { initGlobals, getGlobal, getSystem, setGlobal } from './helpers/globals';
import { initWaveSystem } from './systems/waves';
import { initNotificationSystem } from './systems/notifications';

const init = async () => {
  initGlobals();

  try {
    await preloadGraphics([
      'board_tiles.png',
      'button_idle.png',
      'chest.png',
      'chort.png',
      'elf.png',
      'fireball_tiles.png',
      'health_bar.png',
      'knight.png',
      'logo.png',
      'mage.png',
      'popup_tiles.png',
      'shop_panel_tiles.png',
      'skeleton.png',
      'slime.png',
      'sword_tiles.png',
      'training_dummy_tiles.png',
    ])
      .then(() => console.log('All loaded'))
      .catch(err => {
        console.log('Preload error', err);
      });

    initEvents();

    initPopups(() => {
      initDebug();
      initBoard();
      initCreatures();
      initWaveSystem();
      initUi();
      initNotificationSystem();

      setGlobal('gameStarted', true);
      getGlobal('events').subscribe('win',
        () => setGlobal('gameRunning', false));
      getGlobal('events').subscribe('lose',
        () => setGlobal('gameRunning', false));
      getGlobal('events').subscribe('pause',
        () => setGlobal('gameRunning', false));
      getGlobal('events').subscribe('resume',
        () => setGlobal('gameRunning', true));

      const gameLoop = () => {
        Object.keys(getGlobal('systems')).forEach(systemName => {
          if (!getGlobal('gameRunning')
            && (systemName === 'creatures' || systemName === 'board' || systemName === 'waves')) return;

          if (getSystem(systemName).autoupdate) {
            getSystem(systemName).update();
          }
        });

        requestAnimationFrame(gameLoop);
      };

      gameLoop();
    });
  } catch (err) {
    console.error(err);
  }
};

init();
