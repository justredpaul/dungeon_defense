export const TILES = {
  FOUNTAIN_TOP: [0, 0, 16, 16],
  FOUNTAIN_WALL: [0, 16, 16, 16, 3],
  FOUNTAIN_FLOOR: [0, 32, 16, 16, 3],
  CHEST_FULL: [16, 0, 16, 16],
  CHEST_EMPTY: [32, 0, 16, 16],
  DEFENDER_1_HIT: [61, 96, 15, 22],
  DEFENDER_1_IDLE: [1, 96, 15, 22, 4],
  DEFENDER_2_HIT: [145, 48, 16, 27],
  DEFENDER_2_IDLE: [80, 48, 16, 27, 4],
  DEFENDER_3_HIT: [145, 75, 16, 24],
  DEFENDER_3_IDLE: [81, 75, 16, 24, 4],
  ENEMY_1_HIT: [94, 0, 12, 16, 4],
  ENEMY_1_IDLE: [48, 0, 12, 16, 4],
  ENEMY_2_HIT: [112, 16, 16, 23, 4],
  ENEMY_2_IDLE: [48, 16, 16, 23, 4],
  ENEMY_3_HIT: [79, 99, 16, 16, 4],
  ENEMY_3_IDLE: [79, 99, 16, 16, 4],
  BOSS_HIT: [128, 174, 32, 34, 4],
  BOSS_IDLE: [0, 140, 32, 34, 4],
  HEALTH_BAR_FULL: [0, 247, 39, 9],
  HEALTH_BAR_HIGH: [0, 238, 39, 9],
  HEALTH_BAR_MEDIUM: [39, 247, 39, 9],
  HEALTH_BAR_LOW: [39, 238, 39, 9],
  FIREBALL_1: [0, 48, 16, 16, 4],
  FIREBALL_2: [0, 64, 16, 16, 4],
  FIREBALL_3: [0, 80, 16, 16, 4],
  FIRE_HIT: [69, 178, 7, 48, 4],
}

export const tileSet = document.getElementById('tile_source');
