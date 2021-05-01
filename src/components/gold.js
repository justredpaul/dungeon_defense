import { isMobile } from 'helpers/isMobile';

export class GoldComponent {
  constructor(panelWidth, context) {
    this.y = 0;
    this.height = isMobile() ? 10 : 20;
    this.value = 300;
    this.context = context;

    this.drawValue = () => {
      const fontSize = isMobile() ? 16 : 26;

      this.context.save();
      this.context.font = `${fontSize}px Alagard`;
      this.context.fillStyle = '#4A4A4A';
      this.context.textAlign = 'center';
      this.context.fillText(
        `Gold      ${this.value}`,
        Math.ceil(panelWidth / 2),
        this.y);
      this.context.restore();
    };
    this.drawSeparator = () => {
      const dotWidth = Math.ceil(window.dungeon_defense_game.tilesScale);
      const y = this.y + (isMobile() ? 6 : 12);
      const separatorWidth = panelWidth - 16 * dotWidth;

      this.context.fillStyle = '#AA8D7A';
      this.context.fillRect(4 * dotWidth, y, dotWidth, dotWidth);
      this.context.fillRect(6 * dotWidth, y, dotWidth, dotWidth);
      this.context.fillRect(8 * dotWidth, y, separatorWidth, dotWidth);
      this.context.fillRect(separatorWidth + 9 * dotWidth, y, dotWidth, dotWidth);
      this.context.fillRect(separatorWidth + 11 * dotWidth, y, dotWidth, dotWidth);
    };
  }

  init() {
    this.drawValue();
    this.drawSeparator();
  }

  update() {
    this.drawValue();
    this.drawSeparator();
  }
}
