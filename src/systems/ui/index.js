import { System } from 'baseClasses/system';
import { isMobile } from 'helpers/isMobile';

import { initShopPanel } from './shopPanel';
import { initControlsPanel } from './controlsPanel';

/**
 * Base class for UI with shop and game controls
 */
export class UiSystem extends System {
  constructor() {
    super();

    this.autoupdate = false;

    this.canvas = document.querySelector('.canvas#ui');
    this.canvas.width = isMobile() ? 660 : 1056;
    this.canvas.height = isMobile() ? 300 : 480;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }
}

export const initUi = () => {
  const ui = new UiSystem();

  initShopPanel(ui).forEach(component => ui.addComponent(component));
  initControlsPanel(ui).forEach(component => ui.addComponent(component));

  window.dungeon_defense_game.systems.ui = ui;
};
