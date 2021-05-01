import { Drawable } from 'baseClasses/drawable';
import { Clickable } from 'baseClasses/clickable';
import { getSize } from 'helpers/getSize';

const FLOOR_TILE_SIZE = 16;
const FLOOR_TILES = [
  [0 * FLOOR_TILE_SIZE, 2 * FLOOR_TILE_SIZE],
  [1 * FLOOR_TILE_SIZE, 2 * FLOOR_TILE_SIZE],
  [2 * FLOOR_TILE_SIZE, 2 * FLOOR_TILE_SIZE],
  [3 * FLOOR_TILE_SIZE, 2 * FLOOR_TILE_SIZE],
  [2 * FLOOR_TILE_SIZE, 3 * FLOOR_TILE_SIZE],
];

export class FloorComponent extends Clickable {
  constructor(floorX, floorY, onClick, context, map) {
    const tileSize = FLOOR_TILE_SIZE * window.dungeon_defense_game.tilesScale;

    const floorBounds = {
      x: floorX,
      y: floorY,
      ...getSize(FLOOR_TILE_SIZE, map)
    };
    const onTileClick = ({ x, y }) => {
      onClick({
        x: Math.floor((x - floorX) / tileSize),
        y: Math.floor((y - floorY) / tileSize)
      });
    };
    super(floorBounds, onTileClick);

    this.drawables = [];
    const tiles = document.getElementById('board_tiles');

    for (let item of map) {
      const [x, y, type] = item;

      const tile = [...FLOOR_TILES[type], FLOOR_TILE_SIZE, FLOOR_TILE_SIZE];

      this.drawables.push(new Drawable(
        tiles,
        floorX + x * tileSize,
        floorY + y * tileSize,
        tileSize,
        tileSize,
        tile,
        context
      ));
    }
  }

  init() {
    this.drawables.forEach(drawable => {
      drawable.draw();
    });
  }

  // Empty because we don't need to redraw floor tiles
  update() {}
}
