import type { MyEvent } from '$lib/types/Event';
import { writable } from 'svelte/store';

const alert_duration = 5000;

/**
 * Handles Events that popup on the screen.
 * @param active : the showing MyEvent
 * @param queue: array of the upcoming events
 */
export const alertStore = writable<{
	active: MyEvent | undefined;
	queue: MyEvent[];
}>({
	active: undefined,
	queue: []
});

/**
 * #Update alert store#
 * Transfers the next in queue to the Active slot.
 * Sets a destroy timer if it is not a pending operation
 */
export function shiftAlertQueue() {
	alertStore.update((store) => {
		if (store.queue.length > 0) {
			// place next alert into active slot
			store.active = store.queue[0];

            // doesn't set the destroy callback if this is a pending operation
			if (store.active.style != 'operation') {
				setTimeout(() => {
					store.active?.destroyAlert();
				}, alert_duration);
			}

			// remove from the queue
			store.queue = store.queue.filter((alert) => {
				return store.queue[0].id !== alert.id;
			});
		}
		return store;
	});
}
