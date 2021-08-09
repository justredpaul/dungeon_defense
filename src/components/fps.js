import { getGlobal, setGlobal } from 'helpers/globals';

export class FpsComponent {
  lastCalled = 0;

  init() {}

  update() {
    if (!this.lastCalled) {
      this.lastCalled = performance.now();

      return;
    }

    setGlobal('fps', Math.ceil(1 / ((performance.now() - this.lastCalled) / 1000)));
    setGlobal('gameSpeed', Math.round(60 / getGlobal('fps')));

    this.lastCalled = performance.now();
  }
}
