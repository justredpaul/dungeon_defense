import { FloorComponent } from '../../components/floor';
import { WallsComponent } from '../../components/walls';
import { FountainComponent } from '../../components/fountain';

import { System } from 'baseClasses/system';
import { isMobile } from 'helpers/isMobile';

import level from './level';

/**
 * System for game board with animated fountains
 */
export class BoardSystem extends System {
  constructor() {
    super();

    this.canvas = document.querySelector('.canvas#board');
    this.canvas.width = isMobile() ? 660 : 1056;
    this.canvas.height = isMobile() ? 300 : 480;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }
}

export const initBoard = () => {
  const boardSystem = new BoardSystem();

  const leftOffset = isMobile() ? 108 : 206;
  const topOffsetWalls = isMobile() ? -20 : -32;
  const topOffsetFloor = isMobile() ? 60 : (64 + 32);

  const floor = new FloorComponent(leftOffset, topOffsetFloor, ({ x, y }) => { console.log('Floor!', x, y) }, boardSystem.context, level.floor);
  const walls = new WallsComponent(leftOffset, topOffsetWalls, boardSystem.context, level.walls);

  boardSystem.addComponent(floor);
  boardSystem.addComponent(walls);

  if (level.fountains) {
    for (let fountain of level.fountains) {
      const fountainComponent = new FountainComponent(leftOffset + fountain.x * 16 * window.dungeon_defense_game.tilesScale, fountain.y * 16 * window.dungeon_defense_game.tilesScale, boardSystem.context);

      boardSystem.addComponent(fountainComponent);
    }
  }

  window.dungeon_defense_game.systems.board = boardSystem;
};
