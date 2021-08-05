import { getGlobal } from './globals';

export const getSize = (tileSize, level) => {
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  level.forEach(tile => {
    const [x, y] = tile;

    if (minX > x) {
      minX = x;
    }
    if (minY > y) {
      minY = y;
    }
    if (maxX < x) {
      maxX = x;
    }
    if (maxY < y) {
      maxY = y;
    }
  });

  const tilesScale = getGlobal('tilesScale');

  return {
    width: (maxX - minX + 1) * tileSize * tilesScale,
    height: (maxY - minY + 1) * tileSize * tilesScale
  }
};
