import { getGlobal } from './globals';

export const isCollide = (first, second) => {
  return !(
    first.x >= (
      second.x + second.width * getGlobal('tilesScale')
    )
    || (
      first.x + first.width * getGlobal('tilesScale') <= second.x
    )
  );
};
