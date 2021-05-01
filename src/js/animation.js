import { CANVAS_HEIGHT, CANVAS_WIDTH } from './canvas';

export const setupAnimationLoop = (board) => {
  const animate = () => {
    window.dungeon_defense_game.frame++;
    if (window.dungeon_defense_game.frame >= 1000) {
      window.dungeon_defense_game.frame = 0;
    }

    window.dungeon_defense_game.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    board.drawBoard();

    window.dungeon_defense_game.resources.drawChests();
    window.dungeon_defense_game.waves.spawn();

    window.dungeon_defense_game.army.heal();
    window.dungeon_defense_game.army.throwAll();
    window.dungeon_defense_game.army.drawArmy();
    window.dungeon_defense_game.horde.drawHorde();

    window.dungeon_defense_game.army.checkCollision();
    window.dungeon_defense_game.horde.checkChests();

    window.dungeon_defense_game.debug.countFps();
    if (window.dungeon_defense_game.showFPS) {
      window.dungeon_defense_game.debug.displayFps();
    }

    if (!window.dungeon_defense_game.isOver && !window.dungeon_defense_game.onPause) requestAnimationFrame(animate);
  };

  return animate;
};
