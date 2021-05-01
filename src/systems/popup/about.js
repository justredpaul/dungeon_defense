import { PopupComponent } from '../../components/popup';
import { isMobile } from 'helpers/isMobile';
import { TextComponent } from '../../components/text';

import { version } from '../../../package';

export const initAboutPopup = (canvas, context, onCloseClick) => {
  const commonTextOptions = {
    context,
    color: '#f1f1f1',
    fontSize: 16,
  };

  const title = new TextComponent({ text: 'About', ...commonTextOptions, fontSize: 24 });

  const listPairs = [
    [
      new TextComponent({ text: 'Idea & programming', ...commonTextOptions, align: 'right' }),
      new TextComponent({ text: 'Pavel (Paul) Popov', ...commonTextOptions, align: 'left' }),
    ],
    [
      new TextComponent({ text: 'Tiles', ...commonTextOptions, align: 'right' }),
      new TextComponent({ text: 'Robert Norenberg', ...commonTextOptions, align: 'left' }),
    ],
    [
      new TextComponent({ text: '', ...commonTextOptions, align: 'right' }),
      new TextComponent({ text: 'xyezawr', ...commonTextOptions, align: 'left' }),
    ],
    [
      new TextComponent({ text: 'Music', ...commonTextOptions, align: 'right' }),
      new TextComponent({ text: 'Swiss Arcade Game Entertainment', ...commonTextOptions, align: 'left' }),
    ],
    [
      new TextComponent({ text: 'Font', ...commonTextOptions, align: 'right' }),
      new TextComponent({ text: 'Hewett Tsoi', ...commonTextOptions, align: 'left' }),
    ],
  ];

  const versionEl = new TextComponent({ text: version, ...commonTextOptions });

  const contentRender = (x, y, width, height) => {
    title.draw(x + width / 2, y + height * 0.1);
    listPairs.forEach((pair, i) => {
      const [left, right] = pair;

      left.draw(x + width * 0.39, y + height * (0.3 + 0.18 * i));
      right.draw(x + width * 0.41, y + height * (0.3 + 0.18 * i));
    });
    versionEl.draw(x + 5, y + 5);
  };

  return new PopupComponent({
    id: 'about',
    width: isMobile() ? 500 : 600,
    height: isMobile() ? 260 : 300,
    content: { draw: contentRender },
    action: {
      caption: 'Close',
      onClick: onCloseClick,
      size: 'l',
    },
    canvas,
    context,
    hidden: true
  });
};
