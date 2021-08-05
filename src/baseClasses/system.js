import { nanoid } from 'nanoid';

export class System {
  constructor(autoupdate = true) {
    this.components = {};
    this.autoupdate = autoupdate;
  }

  addComponent(component) {
    const id = nanoid();
    this.components[id] = component;

    component.init();

    return id;
  }

  removeComponent(id) {
    this.components[id].beforeUpdate();
    delete this.components[id];
  }

  update() {
    Object.keys(this.components)
      .map(componentId => this.components[componentId])
      .forEach(component => component.update());
  }
}
