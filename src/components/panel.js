export class PanelComponent {
  constructor(x, y, width, height, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
  }

  _drawPanel() {
    this.context.fillStyle = '#D3BFA9';
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.context.fillRect(this.x, this.y, this.width, this.height);

    const strokeWidth = window.dungeon_defense_game.tilesScale;
    this.context.lineWidth = strokeWidth;
    this.context.strokeStyle = '#AA8D7A';
    this.context.strokeRect(this.x + strokeWidth / 2, this.y + strokeWidth / 2, this.width - strokeWidth, this.height - strokeWidth);
  }

  init() {
    this._drawPanel();
  }

  update() {
    this._drawPanel();
  }
}
