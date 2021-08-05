import { isMobile } from 'helpers/isMobile';

export class GoldComponent {
  constructor(panelWidth, context) {
    this.y = 0;
    this.height = isMobile() ? 15 : 20;
    this.value = 300;
    this.context = context;

    this.drawValue = () => {
      const fontSize = isMobile() ? 16 : 26;

      this.context.save();
      this.context.font = `${fontSize}px Alagard`;
      this.context.fillStyle = '#4A4A4A';
      this.context.textAlign = 'center';
      this.context.fillText(
        `Gold  ${this.value}`,
        Math.ceil(panelWidth / 2),
        this.y);
      this.context.restore();
    };
  }

  init() {
    this.drawValue();
  }

  update() {
    this.drawValue();
  }

  allowSpend(value) {
    return this.value >= value;
  }

  spend(value) {
    if (this.allowSpend(value)) {
      this.value -= value;
    }
  }
}
