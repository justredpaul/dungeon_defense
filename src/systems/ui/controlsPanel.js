import { ButtonComponent } from '../../components/button';
import { placeItemsOnPanel } from 'helpers/placeItemsOnPanel';
import { isMobile } from 'helpers/isMobile';
import { getGlobal, getSystem } from '../../helpers/globals';
import { FramedPanel } from '../../components/framedPanel';

export const initControlsPanel = ui => {
  const controlsSizes = isMobile() ? {
    width: 80,
    height: 320,
  } : {
    width: 100,
    height: 484,
  };
  const controlsPanel = new FramedPanel(ui.canvas.width - controlsSizes.width, 0, controlsSizes.width, controlsSizes.height, [], ui.context);

  const pauseButton = new ButtonComponent({
    x: ui.canvas.width - controlsSizes.width + 10,
    y: 10,
    width: 40,
    height: 40,
    label: 'Pause',
    onClick: () => {
    },
    context: ui.context,
  });
  pauseButton.onClick = () => {
    const isPause = pauseButton.label.text === 'Pause';

    if (isPause) {
      getSystem('popups').showPopup('pause');
    } else {
      getSystem('popups').closePopup('pause');
    }

    pauseButton.setLabel(isPause ? 'Play' : 'Pause');
    ui.update();

    getGlobal('events').emit('toggle_board_touchability', { isBoardTouchable: !isPause });
    getGlobal('events').emit(isPause ? 'pause' : 'resume');
  };
  getGlobal('events').subscribe('pause', () => pauseButton.setLabel('Play'));
  getGlobal('events').subscribe('resume', () => pauseButton.setLabel('Pause'));

  const aboutButton = new ButtonComponent({
    x: ui.canvas.width - controlsSizes.width + 10,
    y: 10,
    width: 40,
    height: 40,
    label: 'About',
    onClick: () => {
      if (!getGlobal('gameRunning')) return;

      getSystem('popups').showPopup('about');
      getGlobal('events').emit('pause');
    },
    context: ui.context,
  });

  placeItemsOnPanel(controlsPanel, [pauseButton, aboutButton], 4, 10);

  return [
    controlsPanel,
    pauseButton,
    aboutButton,
  ]
};
