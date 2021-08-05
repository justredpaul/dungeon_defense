import { System } from 'baseClasses/system';
import { getGlobal, setSystem } from 'helpers/globals';

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
    this.canvas.width = getGlobal('canvasSize').width;
    this.canvas.height = getGlobal('canvasSize').height;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }
}

export const initUi = () => {
  const ui = new UiSystem();

  initShopPanel(ui).forEach(component => ui.addComponent(component));
  initControlsPanel(ui).forEach(component => ui.addComponent(component));

  setSystem('ui', ui);
};
