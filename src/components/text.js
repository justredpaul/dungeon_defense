export class TextComponent {
  constructor({
                text,
                context,
                color = '#4A4A4A',
                fontSize = 20,
                align = 'center',
                baseline = 'middle',
                shadowColor,
  }) {
    this.context = context;
    this.text = text;
    this.color = color;
    this.fontSize = fontSize;
    this.textAlign = align;
    this.textBaseline = baseline;
    this.shadowColor = shadowColor;
  }

  draw(x, y) {
    this.context.save();

    this.context.font = `${this.fontSize}px Alagard`;
    this.context.textAlign = this.textAlign;
    this.context.textBaseline = this.textBaseline;

    if (this.shadowColor) {
      this.context.fillStyle = this.shadowColor;
      this.context.fillText(this.text, x, y + 2);
    }

    this.context.fillStyle = this.color;
    this.context.fillText(this.text, x, y);

    this.context.restore();
  }
}
