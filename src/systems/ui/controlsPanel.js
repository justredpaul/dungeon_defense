import { PanelComponent } from '../../components/panel';
import { ButtonComponent } from '../../components/button';
import { placeItemsOnPanel } from 'helpers/placeItemsOnPanel';
import { isMobile } from 'helpers/isMobile';

export const initControlsPanel = ui => {
  const controlsSizes = isMobile() ? {
    width: 70,
    height: 300,
  } : {
    width: 80,
    height: 480,
  };
  const controlsPanel = new PanelComponent(ui.canvas.width - controlsSizes.width, 0, controlsSizes.width, controlsSizes.height, ui.context);

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
  const onPause = () => {
    pauseButton.setLabel(pauseButton.label.text === 'Pause' ? 'Play' : 'Pause');
    ui.update();
  };
  pauseButton.onClick = onPause;

  const muteButton = new ButtonComponent({
    x: ui.canvas.width - controlsSizes.width + 10,
    y: 10,
    width: 40,
    height: 40,
    label: 'Mute',
    onClick: () => {
    },
    context: ui.context,
  });
  const onMute = () => {
    muteButton.setLabel(muteButton.label.text === 'Mute' ? 'Unmute' : 'Mute');
    ui.update();
  };
  muteButton.onClick = onMute;

  const aboutButton = new ButtonComponent({
    x: ui.canvas.width - controlsSizes.width + 10,
    y: 10,
    width: 40,
    height: 40,
    label: 'About',
    onClick: () => {
      window.dungeon_defense_game.systems.popups.showPopup('about')
    },
    context: ui.context,
  });

  placeItemsOnPanel(controlsPanel, [pauseButton, muteButton, aboutButton], 4);

  return [
    controlsPanel,
    pauseButton,
    muteButton,
    aboutButton,
  ]
};
