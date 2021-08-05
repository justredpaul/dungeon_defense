import { System } from 'baseClasses/system';
import { getGlobal, setSystem } from 'helpers/globals';
import { initWelcomePopup } from './welcome';
import { initAboutPopup } from './about';
import { initWinPopup } from './win';
import { initLosePopup } from './lose';

export class PopupSystem extends System {
  constructor() {
    super();

    this.canvas = document.querySelector('.canvas#popup');
    this.canvas.width = getGlobal('canvasSize').width;
    this.canvas.height = getGlobal('canvasSize').height;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }

  showPopup(_id) {
    Object.keys(this.components)
      .map(componentId => {
        const popup = this.components[componentId];
        if (popup.id === _id) {
          popup.show();
          getGlobal('events').emit(
            'toggle_board_touchability',
            { isBoardTouchable: false },
          );
        }

        return popup;
      })
  }

  closePopup(_id) {
    this.components = this.components.filter(({ id }) => id !== _id);
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

  setSystem('popups', popups);
};
