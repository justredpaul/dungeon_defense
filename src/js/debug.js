export const setupDebug = () => {
  let lastCalled = 0;
  let counter = 0;

  return {
    countFps: () => {
      if (!lastCalled) {
        lastCalled = performance.now();
        counter = 0;
      }

      let delta = (performance.now() - lastCalled) / 1000;
      lastCalled = performance.now();

      window.dungeon_defense_game.fps = Math.ceil(1 / delta);
      window.dungeon_defense_game.gameSpeed = Math.round(60 / window.dungeon_defense_game.fps);
    }
  }
};
