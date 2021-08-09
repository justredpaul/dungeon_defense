import { PopupComponent } from '../../components/popup';
import { TextComponent } from '../../components/text';

export const initPausePopup = (canvas, context, onCloseClick) => {
  const state = new TextComponent({
    text: 'Paused',
    context,
    color: '#f1f1f1',
    fontSize: 32,
  });

  const contentRender = (x, y, width, height) => {
    state.draw(x + width / 2, y + height / 2);
  };

  return new PopupComponent({
    id: 'pause',
    width: 200,
    height: 200,
    content: { draw: contentRender },
    action: {
      caption: 'Resume',
      onClick: onCloseClick,
      size: 'l',
    },
    canvas,
    context,
    hidden: true,
  })
};
