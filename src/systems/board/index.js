import { FloorComponent } from '../../components/floor';
import { WallsComponent } from '../../components/walls';
import { FountainComponent } from '../../components/fountain';

import { System } from 'baseClasses/system';
import { getGlobal, getSystem, setSystem } from 'helpers/globals';

import level from '../../data/level';

/**
 * System for game board with animated fountains
 */
export class BoardSystem extends System {
  constructor() {
    super();

    this.canvas = document.querySelector('.canvas#board');
    this.canvas.width = getGlobal('canvasSize').width;
    this.canvas.height = getGlobal('canvasSize').height;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
  }
}

export const initBoard = () => {
  const boardSystem = new BoardSystem();

  let isBoardTouchable = true;

  getGlobal('events').subscribe('toggle_board_touchability',
    ({ isBoardTouchable: _isBoardTouchable }) => {
      isBoardTouchable = _isBoardTouchable;
    });

  const onFloorTileClick = ({ x, row }) => {
    if (!isBoardTouchable) return;

    if (getSystem('creatures').isOccupied(x, row)) {
      getGlobal('events').emit('notify', { message: 'Cell is occupied'});
      return;
    }

    getGlobal('events').emit(
      'floor_tile_click',
      { x, row, },
    );
  };

  const floor = new FloorComponent(getGlobal('board_numbers').left_offset, getGlobal('board_numbers').top_offset, onFloorTileClick, boardSystem.context, level.floor);
  const walls = new WallsComponent(getGlobal('board_numbers').left_offset, getGlobal('board_numbers').top_offset_walls, boardSystem.context, level.walls);

  boardSystem.addComponent(floor);
  boardSystem.addComponent(walls);

  if (level.fountains) {
    for (let fountain of level.fountains) {
      const fountainComponent = new FountainComponent(
        getGlobal('board_numbers').left_offset + fountain.x * 16 * getGlobal('tilesScale'),
        fountain.y * 16 * getGlobal('tilesScale'),
        boardSystem.context
      );

      boardSystem.addComponent(fountainComponent);
    }
  }

  setSystem('board', boardSystem);
};
