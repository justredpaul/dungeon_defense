import { PopupComponent } from '../../components/popup';
import { LogoComponent } from '../../components/logo';
import { TextComponent } from '../../components/text';
import { isMobile } from 'helpers/isMobile';

export const initWelcomePopup = (canvas, context, onStartClick) => {
  const logo = new LogoComponent(context);
  const commonTextOptions = {
    context,
    color: '#f1f1f1',
  };
  const textLines = [
    new TextComponent({ text: 'Save your gold from terrible creatures', ...commonTextOptions }),
    new TextComponent({ text: 'Recruit and place unit on lines to stop enemies', ...commonTextOptions }),
    new TextComponent({ text: 'Defeat the final boss to win and escape', ...commonTextOptions }),
  ];

  const contentRender = (x, y, width, height) => {
    logo.draw(x + width / 2, y + height * 0.2);
    textLines.forEach((line, i) => line
      .draw(x + width / 2, y + height * (0.55 + 0.20 * i)))
  };

  return new PopupComponent({
    id: 'welcome',
    width: isMobile() ? 500 : 600,
    height: isMobile() ? 260 : 300,
    content: { draw: contentRender },
    action: {
      caption: 'Start',
      onClick: onStartClick,
      size: 'l',
    },
    canvas,
    context,
    hidden: true
  });
};
