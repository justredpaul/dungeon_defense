import { preloadGraphics } from './helpers/preloadGraphics';

import { initBoard } from './systems/board';
import { initUi } from './systems/ui';
import { initDebug } from './systems/debug';
import { isMobile } from 'helpers/isMobile';
import { initPopups } from './systems/popup';

const init = async () => {
  window.dungeon_defense_game = {
    systems: {},
    tilesScale: isMobile() ? 2.5 : 4,
    gameSpeed: 1,
  };

  try {
    await preloadGraphics([
      'board_tiles.png',
      'popup_tiles.png',
      'logo.png',
      'button_idle.png',
      'elf.png',
      'knight.png',
      'mage.png',
      'shop_icons.png',
    ])
      .then(() => console.log('All loaded'))
      .catch(err => {
        console.log('Preload error', err);
      });

    initPopups(() => {
      initDebug();
      initBoard();
      initUi();

      const gameLoop = () => {
        const { systems } = window.dungeon_defense_game;

        Object.keys(systems).forEach(systemName => {
          if (systems[systemName].autoupdate) {
            systems[systemName].update();
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
