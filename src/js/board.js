import { Drawable } from './drawable';
import { TILES, tileSet } from './tileAtlas';

const boardImg = document.getElementById('board_source');

class Fountain extends Drawable {
  constructor({ x, y }) {
    super({ x, y, width: 64, height: 64 });

    this.frame = 0;
  }

  draw() {
    this.frame += 0.1;
    if (this.frame >= 1000) {
      this.frame = 0;
    }

    window.dungeon_defense_game.ctx.drawImage(tileSet, ...TILES.FOUNTAIN_TOP, this.x, this.y, this.width, this.height);

    let [tileX, tileY, tileWidth, tileHeight, frames] = TILES.FOUNTAIN_WALL;
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX + (Math.floor(this.frame) % frames) * tileWidth, tileY, tileWidth, tileHeight, this.x, this.y + 64, this.width, this.height);

    [tileX, tileY, tileWidth, tileHeight, frames] = TILES.FOUNTAIN_FLOOR;
    window.dungeon_defense_game.ctx.drawImage(tileSet, tileX + (Math.floor(this.frame) % frames) * tileWidth, tileY, tileWidth, tileHeight, this.x, this.y + 128, this.width, this.height);
  }
}

export class Board {
  fountains = [];

  constructor() {
    this.fountains.push(new Fountain({ x: 256, y: -48 }));
    this.fountains.push(new Fountain({ x: 576, y: -48 }));
  }

  drawBoard() {
    window.dungeon_defense_game.ctx.drawImage(boardImg, 0, 0, 896, 464, 0, 0, 896, 464);

    this.fountains.forEach(fountain => fountain.draw());
  }
}

