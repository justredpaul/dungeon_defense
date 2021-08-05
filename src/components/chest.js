import { Drawable } from '../baseClasses/drawable';
import { getGlobal } from '../helpers/globals';

export class ChestComponent {
  constructor(rowIndex, context) {
    this.row = rowIndex;

    this.type= 'chest';

    this.chest = new Drawable(
      document.getElementById('chest'),
      getGlobal('board_numbers').left_offset,
      getGlobal('board_numbers').top_offset + rowIndex * 16 * getGlobal('tilesScale'),
      16,
      16,
      [0, 0],
      context,
      true,
      0.8 * getGlobal('tilesScale')
    );
  }

  _clear() {
    this.chest.beforeDraw();
  };

  _draw() {
    this.chest.draw();
  }

  init() {
    this._draw();
  }

  beforeUpdate() {
    this._clear()
  }

  update() {
    this._draw();
  }
}
