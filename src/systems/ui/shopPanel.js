import { PanelComponent } from '../../components/panel';
import { GoldComponent } from '../../components/gold';
import { ShopEntity } from '../../components/shopEntity';

import { isMobile } from 'helpers/isMobile';
import { placeItemsOnPanel } from 'helpers/placeItemsOnPanel';

export const initShopPanel = (ui) => {
  const shopSize = isMobile() ? {
    width: 108,
    height: 300,
  } : {
    width: 206,
    height: 480,
  };
  const shopPanel = new PanelComponent(0, 0, shopSize.width, shopSize.height, ui.context);
  const gold = new GoldComponent(shopSize.width, ui.context);

  let entities;

  const onEntityClick = entity => {
    const isAlreadyActive = entity.active;

    entities.list.forEach(_entity => _entity.active = false);

    if (!isAlreadyActive) {
      entity.active = true;
    }

    ui.update();
  };

  let elfShopEntity;
  elfShopEntity = new ShopEntity(shopSize, {
    tiles: document.getElementById('elf'),
    tile: [0, 0, 16, 23],
    weapon: 'SWORD',
    attack: 30,
    defense: 50,
    cost: 100
  }, () => onEntityClick(elfShopEntity), ui.context);

  let knightShopEntity;
  knightShopEntity = new ShopEntity(shopSize, {
    tiles: document.getElementById('knight'),
    tile: [0, 0, 16, 27],
    weapon: 'SWORD',
    attack: 30,
    defense: 50,
    cost: 100
  }, () => onEntityClick(knightShopEntity), ui.context);

  let mageShopEntity;
  mageShopEntity = new ShopEntity(shopSize, {
    tiles: document.getElementById('mage'),
    tile: [0, 0, 16, 24],
    weapon: 'WAND',
    attack: 30,
    defense: 50,
    cost: 100
  }, () => onEntityClick(mageShopEntity), ui.context);

  placeItemsOnPanel(
    shopPanel,
    [gold, elfShopEntity, knightShopEntity, mageShopEntity],
    10,
    isMobile() ? 16 : 26);

  entities = {
    init: function() {
      this.list.forEach(item => item.init());
    },
    update: function() {
      this.list.forEach(item => item.update());
    },
    list: [
      elfShopEntity, knightShopEntity, mageShopEntity
    ]
  };

  return [shopPanel, gold, entities];
};
