import { System } from 'baseClasses/system';
import { FpsComponent } from '../../components/fps';
import { setSystem } from '../../helpers/globals';

export class Debug extends System {
  constructor() {
    super();
  }
}

export const initDebug = () => {
  const debug = new Debug();
  debug.addComponent(new FpsComponent());

  setSystem('debug', debug);
};
