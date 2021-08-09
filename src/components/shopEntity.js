import { Clickable } from 'baseClasses/clickable';
import { isMobile } from 'helpers/isMobile';
import { ShopCell } from './shopCell';

export class ShopEntity extends Clickable {
  constructor(size, entity, onClick, context) {
    super(null, onClick);
    this.x = 0;
    this.y = 0;
    this.width = size.width - 10;
    this.height = isMobile() ? 80 : 120;
    this.entity = entity;
    this.context = context;
    this.active = false;

    this.cell = new ShopCell(0, 0, size.width, this.height, context);
  }

  _draw() {
    // Draw hero preview
    this.context.save();

    const [tileX, tileY, tileWidth, tileHeight] = this.entity.tile;
    const tileSize = isMobile() ? 2.5 : 4;
    this.context.drawImage(
      this.entity.tiles,
      tileX,
      tileY,
      tileWidth,
      tileHeight,
      this.x + (isMobile() ? 15 : 28),
      this.y + this.height - tileHeight * tileSize + (isMobile() ? -6 : -10),
      tileWidth * tileSize,
      tileHeight * tileSize
    );

    // Draw hero stats
    const fontSize = isMobile() ? 16 : 26;
    this.context.fillStyle = '#4A4A4A';
    this.context.font = `${fontSize}px Alagard`;
    this.context.textAlign = 'end';
    this.context.textBaseline = 'middle';

    // Cost
    this.context.fillText(
      this.entity.cost,
      this.x + this.width + (isMobile() ? -18 : -36),
      this.y + this.height + (isMobile() ? -20 : -26)
    );

    this.context.restore();
  }

  init() {
    this.cell.init();
    this._draw();
  }

  update() {
    this.cell.update();
    this._draw();
  }

  activate() {
    this.active = true;

    this.cell.activate();
  }

  deactivate() {
    this.active = false;

    this.cell.deactivate();
  }
}
