import { TimedEventManager } from "#app/timed-event-manager";

export const timedEventManager = new TimedEventManager();

export function initTimedEvents(): void {
  timedEventManager.init();
}
