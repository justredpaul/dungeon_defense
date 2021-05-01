export class System {
  constructor(autoupdate = true) {
    this.components = [];
    this.autoupdate = autoupdate;
  }

  addComponent(component) {
    this.components.push(component);

    component.init();
  }

  update() {
    this.components.forEach(component => component.update());
  }
}
