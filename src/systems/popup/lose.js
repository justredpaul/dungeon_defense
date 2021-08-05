import { PopupComponent } from '../../components/popup';
import { isMobile } from 'helpers/isMobile';
import { TextComponent } from '../../components/text';

export const initLosePopup = (canvas, context, onCloseClick) => {
  const commonTextOptions = {
    context,
    color: '#f1f1f1',
    fontSize: 24,
  };

  const title = new TextComponent({ text: 'Lose', ...commonTextOptions, fontSize: 32 });

  const messageLineOne = new TextComponent({
    text: 'Unfortunately you were defeated',
    ...commonTextOptions
  });
  const messageLineTwo = new TextComponent({
    text: 'Better luck next time!',
    ...commonTextOptions
  });

  const contentRender = (x, y, width, height) => {
    title.draw(x + width / 2, y + height * 0.1);
    messageLineOne.draw(x + width / 2, y + height * 0.48);
    messageLineTwo.draw(x + width / 2, y + height * 0.72);
  };

  return new PopupComponent({
    id: 'lose',
    width: isMobile() ? 500 : 600,
    height: isMobile() ? 260 : 280,
    content: { draw: contentRender },
    action: {
      caption: 'Play again',
      onClick: onCloseClick,
      size: 'l',
    },
    canvas,
    context,
    hidden: true,
  });
};
