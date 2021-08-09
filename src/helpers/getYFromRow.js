import { getGlobal } from './globals';

export const getYFromRow = row => row * (16 * getGlobal('tilesScale'));
