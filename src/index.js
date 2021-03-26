import { setupCanvas } from './js/canvas';
import { setupAnimationLoop } from './js/animation';
import { Board } from './js/board';
import { Resources } from './js/resources';
import { Army } from './js/army';
import { Horde } from './js/horde';
import { createUi } from './js/ui';
import { setupShop } from './js/shop';
import { Audible } from './js/audible';

import main_theme from 'url:./assets/sounds/main_theme.mp3';
import { Waves } from './js/waves';

const popupWelcome = document.querySelector('.popup_welcome');
const startButton = popupWelcome.querySelector('.popup__button');

const init = () => {
  window.dungeon_defense_game = {
    frame: 0,
    isOver: false,
    onPause: false,
    rows: 6
  };

  const { canvas, ctx } = setupCanvas();

  window.dungeon_defense_game.canvas = canvas;
  window.dungeon_defense_game.ctx = ctx;

  const board = new Board();
  window.dungeon_defense_game.resources = new Resources({ startValue: 300 });

  window.dungeon_defense_game.ui = createUi();
  window.dungeon_defense_game.shop = setupShop();

  window.dungeon_defense_game.army = new Army();
  window.dungeon_defense_game.horde = new Horde();

  window.dungeon_defense_game.waves = new Waves();
  window.dungeon_defense_game.waves.start();

  window.dungeon_defense_game.animate = setupAnimationLoop(board);
  window.dungeon_defense_game.animate();

  popupWelcome.style.visibility = 'hidden';
  window.dungeon_defense_game.ui.ui.style.visibility = 'visible';

  window.dungeon_defense_game.mainTheme = new Audible(main_theme, true);
  window.dungeon_defense_game.mainTheme.play();

  window.dungeon_defense_game.endings = {
    win: () => {
      window.dungeon_defense_game.isOver = true;
      window.dungeon_defense_game.ui.winPopup.style.visibility = 'visible';
    },
    lose: () => {
      window.dungeon_defense_game.isOver = true;
      window.dungeon_defense_game.ui.losePopup.style.visibility = 'visible';
    }
  }
}

startButton.addEventListener('click', init);
