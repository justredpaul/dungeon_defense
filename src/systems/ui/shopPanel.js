import { GoldComponent } from '../../components/gold';
import { ShopEntity } from '../../components/shopEntity';

import { isMobile } from 'helpers/isMobile';
import { placeItemsOnPanel } from 'helpers/placeItemsOnPanel';
import { getGhostFromEntity } from 'helpers/getGhostFromEntity';
import { getGlobal, setGlobal, getSystem } from 'helpers/globals';
import { FramedPanel } from '../../components/framedPanel';
import { ShopCell } from '../../components/shopCell';

import creatures from '../../data/creatures';

export const initShopPanel = (ui) => {
  const shopSize = isMobile() ? {
    width: 110,
    height: 320,
  } : {
    width: 210,
    height: 484,
  };

  const framedPanel = new FramedPanel(0, 0, shopSize.width, shopSize.height, [], ui.context);
  const titleCell = new ShopCell(
    0,
    0,
    shopSize.width,
    isMobile() ? 60 : 80,
    ui.context
  );

  setGlobal('gold', new GoldComponent(shopSize.width, ui.context));

  getGlobal('events').subscribe('spawn_gold', ({ goldValue }) => {
    getGlobal('gold').value += goldValue;
    ui.update();
  });

  let entities;

  getGlobal('events').subscribe('ghost_spawned', () => {
    entities.list.forEach(_entity => _entity.deactivate());
    ui.update();
  });

  const onEntityClick = entity => {
    if (!getGlobal('gameRunning')) return;

    if (!getGlobal('gold').allowSpend(entity.entity.cost)) {
      getGlobal('events').emit('notify', { message: 'Not enough gold'});
      return;
    }

    const isAlreadyActive = entity.active;

    if (isAlreadyActive) {
      entity.deactivate();
      ui.update();
      return;
    }

    entities.list.forEach(_entity => _entity.deactivate());
    entity.activate();
    ui.update();

    const ghost = getGhostFromEntity(entity.entity);
    if (!ghost) return;

    getSystem('creatures').addGhost(ghost);
  };

  let elfShopEntity;
  elfShopEntity = new ShopEntity(shopSize, {
    name: 'elf',
    tiles: document.getElementById('elf'),
    tile: [0, 0, 16, 23],
    cost: creatures.elf.cost
  }, () => onEntityClick(elfShopEntity), ui.context);

  let knightShopEntity;
  knightShopEntity = new ShopEntity(shopSize, {
    name: 'knight',
    tiles: document.getElementById('knight'),
    tile: [0, 0, 16, 27],
    cost: creatures.knight.cost
  }, () => onEntityClick(knightShopEntity), ui.context);

  let mageShopEntity;
  mageShopEntity = new ShopEntity(shopSize, {
    name: 'mage',
    tiles: document.getElementById('mage'),
    tile: [0, 0, 16, 24],
    cost: creatures.mage.cost
  }, () => onEntityClick(mageShopEntity), ui.context);

  placeItemsOnPanel(
    framedPanel,
    [ getGlobal('gold'), elfShopEntity, knightShopEntity, mageShopEntity],
    isMobile() ? -10 : -18,
    isMobile() ? 38 : 54);

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

  return [framedPanel, titleCell, getGlobal('gold'), entities];
};
