import { setGlobal } from '../../helpers/globals';

export class EventsSystem {
  constructor() {
    this.subscriptions = new Map();
  }

  subscribe = (eventName, cb, args) => {
    const eventSubscriptions = this.subscriptions.get(eventName) || [];
    this.subscriptions.set(eventName, [...eventSubscriptions, { cb, args }]);
  };

  unsubscribe = eventName => {
    this.subscriptions.delete(eventName);
  };

  emit = (eventName, emitArgs) => {
    // console.log('Emitting event', eventName, 'with parameters', emitArgs);
    const eventSubscriptions = this.subscriptions.get(eventName);

    if (!eventSubscriptions) return;

    for (let { cb, args } of eventSubscriptions) {
      if (cb) {
        cb({ ...args, ...emitArgs });
      }
    }
  }
}

export const initEvents = () => {
  setGlobal('events', new EventsSystem());
};
