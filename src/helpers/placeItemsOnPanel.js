export const placeItemsOnPanel = (panel, items, spacing, additionalTopOffset = 0) => {
  const { x: panelX, y: panelY, width: panelWidth } = panel;

  let topOffset = panelY + window.dungeon_defense_game.tilesScale * 2 + additionalTopOffset;

  items.forEach(button => {
    button.x = panelX + window.dungeon_defense_game.tilesScale * 2;
    button.y = topOffset;
    button.width = panelWidth - window.dungeon_defense_game.tilesScale * 4;

    topOffset += spacing + button.height;
  });
};
