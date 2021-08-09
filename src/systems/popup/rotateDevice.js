import { PopupComponent } from '../../components/popup';
import { TextComponent } from '../../components/text';

export const initRotateDevicePopup = (canvas, context) => {
  const messageLine1 = new TextComponent({
    text: 'Please rotate',
    context,
    color: '#f1f1f1',
    fontSize: 32,
  });
  const messageLine2 = new TextComponent({
    text: 'your device',
    context,
    color: '#f1f1f1',
    fontSize: 32,
  });

  const contentRender = (x, y, width, height) => {
    messageLine1.draw(x + width / 2, y + height / 2);
    messageLine2.draw(x + width / 2, y + height);
  };

  return new PopupComponent({
    id: 'rotateDevice',
    width: 350,
    height: 200,
    content: { draw: contentRender },
    canvas,
    context,
    hidden: true,
  })
};
