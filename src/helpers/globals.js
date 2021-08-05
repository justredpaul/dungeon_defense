import { isMobile } from './isMobile';

export const initGlobals = () => {
  window.dungeon_defense_game = {
    systems: {},
    tilesScale: isMobile() ? 2.5 : 4,
    gameSpeed: 2,
    gameRunning: true,
    canvasSize: {
      width: isMobile() ? 660 : 1056,
      height: isMobile() ? 320 : 480,
    },
    board_numbers: {
      left_offset: isMobile() ? 108 : 206,
      top_offset: isMobile() ? 60 : 96,
      top_offset_walls: isMobile() ? -20 : -32,
      spawn_point: isMobile() ? 480 : 760,
      fire_distance: isMobile() ? 568 : 860,
    }
  };
};

export const getGlobal = paramName => window.dungeon_defense_game[paramName];

export const setGlobal = (paramName, value) => window.dungeon_defense_game[paramName] = value;

export const getSystem = systemName => window.dungeon_defense_game.systems[systemName];

export const setSystem = (systemName, item) => window.dungeon_defense_game.systems[systemName] = item;
