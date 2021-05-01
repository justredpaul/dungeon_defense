export class LogoComponent {
  constructor(context) {
    this.context = context;
  }

  draw(centerX, centerY) {
    const logoEl = document.getElementById('logo');
    const width = logoEl.width;
    const height = logoEl.height;

    this.context.drawImage(logoEl, centerX - width / 2, centerY - height / 2, width, height);
  }
}
