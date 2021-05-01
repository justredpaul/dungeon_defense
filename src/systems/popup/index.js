import { System } from 'baseClasses/system';
import { isMobile } from 'helpers/isMobile';
import { initWelcomePopup } from './welcome';
import { initAboutPopup } from './about';

export class PopupSystem extends System {
  constructor() {
    super();

    this.canvas = document.querySelector('.canvas#popup');
    this.canvas.width = isMobile() ? 660 : 1056;
    this.canvas.height = isMobile() ? 300 : 480;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }

  showPopup(_id) {
    this.components.map(popup => {
      if (popup.id === _id) {
        popup.show();
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
    console.log('About closed');
  };
  popups.addComponent(initAboutPopup(popups.canvas, popups.context, onAboutClick));

  window.dungeon_defense_game.systems.popups = popups;
};
