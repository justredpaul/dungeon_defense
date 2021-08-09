import { getGlobal } from './globals';

export const placeItemsOnPanel = (panel, items, spacing, additionalTopOffset = 0) => {
  const { x: panelX, y: panelY, width: panelWidth } = panel;
  const tilesScale = getGlobal('tilesScale');

  let topOffset = panelY + tilesScale * 2 + additionalTopOffset;

  items.forEach(item => {
    item.x = panelX + tilesScale * 2;
    item.y = topOffset;
    item.width = panelWidth - tilesScale * 4;

    if (item.cell) {
      item.cell.y = topOffset;
    }

    topOffset += spacing + item.height;
  });
};
