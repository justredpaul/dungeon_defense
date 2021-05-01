import { System } from 'baseClasses/system';
import { FpsComponent } from '../../components/fps';

export class Debug extends System {
  constructor() {
    super();
  }
}

export const initDebug = () => {
  window.dungeon_defense_game.systems.debug = new Debug();
  window.dungeon_defense_game.systems.debug.addComponent(new FpsComponent());
};
