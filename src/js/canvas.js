import { tileSet } from './tileAtlas';

export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 600;

export const setupCanvas = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  ctx.imageSmoothingEnabled = false;

  return {
    canvas,
    ctx,
  }
}

export const getBase64ImgFromTile = tile => {
  let [[tileX, tileY, tileWidth, tileHeight]] = tile;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = tileWidth * 2.5;
  canvas.height = tileHeight * 2.5;
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(tileSet, tileX, tileY, tileWidth, tileHeight, 0, 0, tileWidth * 2.5, tileHeight * 2.5);
  return { src: canvas.toDataURL(), width: tileWidth * 2.5, height: tileHeight * 2.5 };
}
