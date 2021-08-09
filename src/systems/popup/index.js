import { System } from 'baseClasses/system';
import { getGlobal, setSystem } from 'helpers/globals';
import { initWelcomePopup } from './welcome';
import { initAboutPopup } from './about';
import { initWinPopup } from './win';
import { initLosePopup } from './lose';
import { initPausePopup } from './pause';
import { initRotateDevicePopup } from './rotateDevice';
import { isPortraitMode } from '../../helpers/isPortraitMode';

export class PopupSystem extends System {
  constructor() {
    super();

    this.canvas = document.querySelector('.canvas#popup');
    this.canvas.width = getGlobal('canvasSize').width;
    this.canvas.height = getGlobal('canvasSize').height;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;

    this.idsMap = {};
  }

  addComponent(popup) {
    this.idsMap[popup.id] = super.addComponent(popup);
  }

  showPopup(_id) {
    const componentId = this.idsMap[_id];

    if (!componentId) return;

    this.components[componentId].show();
  }

  closePopup(_id) {
    const componentId = this.idsMap[_id];

    if (!componentId) return;

    this.components[componentId].close();
  }

  closeAllPopups() {
    Object.keys(this.components).map(componentId => this.components[componentId].close());
  }
}

export const initPopups = (onGameStart) => {
  const popups = new PopupSystem();

  popups.addComponent(initWelcomePopup(popups.canvas, popups.context, onGameStart));

  const onAboutClick = () => {
    getGlobal('events').emit(
      'toggle_board_touchability',
      { isBoardTouchable: true },
    );
    getGlobal('events').emit('resume');
  };
  popups.addComponent(initAboutPopup(popups.canvas, popups.context, onAboutClick));

  const onPlayAgain = () => window.location.reload();
  popups.addComponent(initWinPopup(popups.canvas, popups.context, onPlayAgain));
  popups.addComponent(initLosePopup(popups.canvas, popups.context, onPlayAgain));

  const onResume = () => getGlobal('events').emit('resume');
  popups.addComponent(initPausePopup(popups.canvas, popups.context, onResume));

  popups.addComponent(initRotateDevicePopup(popups.canvas, popups.context));

  const showRotatePopup = () => {
    popups.closeAllPopups();

    getGlobal('events').emit('pause');
    popups.showPopup('rotateDevice');
    popups.update();
  };

  if (isPortraitMode() && screen.availWidth < 660) {
    showRotatePopup();
  } else {
    popups.showPopup('welcome');
    popups.update();
  }

  window.addEventListener('resize', () => {
    if (isPortraitMode() && screen.availWidth < 660) {
      showRotatePopup();
    } else {
      popups.closePopup('rotateDevice');

      if (!getGlobal('gameStarted')) {
        popups.showPopup('welcome');
      } else {
        getGlobal('events').emit('resume');
      }

      popups.update();
    }
  });

  setSystem('popups', popups);
};
