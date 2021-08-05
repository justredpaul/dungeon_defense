import { System } from 'baseClasses/system';
import { getGlobal, getSystem, setSystem } from '../../helpers/globals';
import { ToastComponent } from '../../components/toast';
import { Timer } from '../../baseClasses/timer';

export class NotificationsSystem extends System {
  constructor() {
    super();

    getGlobal('events').subscribe('notify', this._showToast);
  }

  _hideToast = () => {
    this.removeComponent(this.toastId);
    this.hideTimer = null;
    this.toastId = null;

    getSystem('ui').update();
  };

  _showToast = ({ message }) => {
    if (this.toastId) {
      this._hideToast();
    }

    this.toastId = this.addComponent(new ToastComponent(message, getSystem('ui').context));
    this.hideTimer = new Timer(() => this._hideToast(), 0.01, 1, false, false);
    this.hideTimer.start();
  };

  update() {
    if (this.hideTimer) {
      this.hideTimer.tick();
    }
  }
}

export const initNotificationSystem = () => {
  setSystem('notifications', new NotificationsSystem());
};
