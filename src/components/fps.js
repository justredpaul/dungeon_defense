export class FpsComponent {
  lastCalled = 0;

  init() {}

  update() {
    if (!this.lastCalled) {
      this.lastCalled = performance.now();

      return;
    }

    window.dungeon_defense_game.fps = Math.ceil(1 / ((performance.now() - this.lastCalled) / 1000));
    window.dungeon_defense_game.gameSpeed = Math.round(60 / window.dungeon_defense_game.fps);

    this.lastCalled = performance.now();
  }
}
