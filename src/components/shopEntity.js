import { Clickable } from 'baseClasses/clickable';
import { isMobile } from 'helpers/isMobile';

const SHOP_ICONS_TILES = {
  GOLD: [0, 0, 16, 16],
  SWORD: [16, 0, 16, 16],
  WAND: [0, 16, 16, 16],
  SHIELD: [16, 16, 16, 16],
};

export class ShopEntity extends Clickable {
  constructor(size, entity, onClick, context) {
    super(null, onClick);
    this.x = 0;
    this.y = 0;
    this.width = size.width - 10;
    this.height = isMobile() ? 70 : 120;
    this.entity = entity;
    this.context = context;
    this.active = false;
  }

  _draw() {
    const shop_icons = document.getElementById('shop_icons');

    // Draw hero preview
    this.context.save();

    if (this.active) {
      this.context.strokeRect(this.x, this.y - 2, this.width, this.height + 2);
    }

    const [tileX, tileY, tileWidth, tileHeight] = this.entity.tile;
    const tileSize = isMobile() ? 2.5 : 4;
    this.context.drawImage(
      this.entity.tiles,
      tileX,
      tileY,
      tileWidth,
      tileHeight,
      this.x,
      this.y,
      tileWidth * tileSize,
      tileHeight * tileSize
    );

    // Draw hero stats
    const fontSize = isMobile() ? 16 : 26;
    this.context.fillStyle = '#4A4A4A';
    this.context.font = `${fontSize}px Alagard`;
    this.context.textAlign = 'end';
    this.context.textBaseline = 'middle';
    const iconSize = isMobile() ? 16 : 32;

    // Attack
    this.context.drawImage(shop_icons, ...SHOP_ICONS_TILES[this.entity.weapon], this.x + this.width / 2, this.y, iconSize, iconSize);
    this.context.fillText(this.entity.attack, this.x + this.width - 4, this.y + iconSize / 2);

    // Defence
    this.context.drawImage(shop_icons, ...SHOP_ICONS_TILES.SHIELD, this.x + this.width / 2, this.y + iconSize + 10, iconSize, iconSize);
    this.context.fillText(this.entity.defense, this.x + this.width - 4, this.y + iconSize + 10 + iconSize / 2);

    // Cost
    this.context.drawImage(shop_icons, ...SHOP_ICONS_TILES.GOLD, this.x + this.width / 2, this.y + iconSize * 2 + 20, iconSize, iconSize);
    this.context.fillText(this.entity.cost, this.x + this.width - 4, this.y + iconSize * 2 + 20 + iconSize / 2);

    this.context.restore();
  }

  init() {
    this._draw();
  }

  update() {
    this._draw();
  }
}
