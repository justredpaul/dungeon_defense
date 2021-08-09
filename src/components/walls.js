import { Drawable } from 'baseClasses/drawable';
import { getGlobal } from 'helpers/globals';

const WALL_TILE_SIZE = 16;
const WALLS_TILES = [
  [3 * WALL_TILE_SIZE, 5 * WALL_TILE_SIZE],
  [0 * WALL_TILE_SIZE, 6 * WALL_TILE_SIZE],
  [0 * WALL_TILE_SIZE, 3 * WALL_TILE_SIZE],
  [1 * WALL_TILE_SIZE, 3 * WALL_TILE_SIZE],
  [1 * WALL_TILE_SIZE, 6 * WALL_TILE_SIZE],
  [2 * WALL_TILE_SIZE, 6 * WALL_TILE_SIZE],
  [3 * WALL_TILE_SIZE, 4 * WALL_TILE_SIZE], // Blue flag
  [0 * WALL_TILE_SIZE, 5 * WALL_TILE_SIZE], // Green flag
  [1 * WALL_TILE_SIZE, 5 * WALL_TILE_SIZE], // Red flag
  [2 * WALL_TILE_SIZE, 5 * WALL_TILE_SIZE], // Yellow flag
  [0 * WALL_TILE_SIZE, 1 * WALL_TILE_SIZE], // Hole 1
  [3 * WALL_TILE_SIZE, 6 * WALL_TILE_SIZE], // Hole 2
];

export class WallsComponent {
  constructor(floorX, floorY, context, map) {
    this.drawables = [];
    const tiles = document.getElementById('board_tiles');
    const tilesScale = getGlobal('tilesScale');

    for (let item of map) {
      const [x, y, type] = item;

      const tile = [...WALLS_TILES[type]];

      this.drawables.push(new Drawable(
        tiles,
        floorX + x * WALL_TILE_SIZE * tilesScale,
        floorY + y * WALL_TILE_SIZE * tilesScale,
        WALL_TILE_SIZE,
        WALL_TILE_SIZE,
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

  // Empty because we don't need to redraw walls tiles
  update() {
  }
}
