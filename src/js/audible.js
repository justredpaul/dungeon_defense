export class Audible {
  constructor(path, loop = false, volume = 0.2) {
    this.loop = loop;

    this.audio = new Audio(path);
    this.audio.volume = volume;

    if (loop) {
      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0;
        this.audio.play();
      })
    }
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
}
