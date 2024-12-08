import { generateUUID } from '$lib/helpers/id';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { alertStore, shiftAlertQueue } from '$lib/stores/alert';

import type { Relation } from './Relation';
//import { fb } from '$lib/stores/firebase';
import { get } from 'svelte/store';
import { instanceToPlain } from 'class-transformer';

let post_operation_visible_duration = 2000;

/**
 * Generates the id, timestamp, etc. of an event at creation.
 * Most things will happen in two stages. Initiation and completion.
 * The class is expected to instantiate and then be called back for completion.
 */
export class MyEvent implements Event {
	id = generateUUID('evt_');
	timestamp = Timestamp.now();
	unix_timestamp = Math.floor(Date.now() / 1000);

	type: string;
	visibility: string;
	style: string;
	title: string;
	description: string;
	timestamp_complete?: Timestamp;
	unix_timestamp_complete?: number;
	persist: boolean;
	relations: Relation[] = [];

	// CLASS INSTANCE CREATION
	constructor(options: {
		type: string;
		visibility: string; // none, local, public
		style: string; // info, success, fail, operation
		title: string;
		description: string;
		persist: boolean;
		relations?: Relation[];
	}) {
		this.type = options.type;
		this.visibility = options.visibility;
		this.style = options.style;
		this.title = options.title;
		this.description = options.description;
		this.persist = options.persist;

		if (options.relations) {
			this.relations = options.relations;
		}

		// Display to user/s
		if (options.visibility != 'none') {
			this.queueAlert();
		}
		if (this.style != 'operation') {
			this.saveEvent();
		}
	}

	// add event to the alertStore queue. if there's no alert active, calls the shiftQueue function
	queueAlert() {
		alertStore.update((store) => {
			store.queue = [...store.queue, this];
			if (!store.active) {
				shiftAlertQueue();
			}
			return store;
		});
	}

	// remove the alert from the active slot if there
	destroyAlert() {
		alertStore.update((store) => {
			if (store.active) {
				if (store.active == this) {
					store.active = undefined;
				}
			}
			return store;
		});
	}

	exportObject() {
		let plainObject = instanceToPlain(this, { exposeUnsetFields: false });

		return plainObject;
	}

	// alter the event details based on action result, then save event to db. alter displayed alert if necessary
	async saveEvent(options?: {
		title?: string;
		description?: string;
		style?: string;
		type?: string;
		persist?: boolean;
	}) {
		let overOperation = false;

		if (this.style == 'operation') {
			// calc complete timestamps
			this.timestamp_complete = Timestamp.now();
			this.unix_timestamp_complete = Math.floor(Date.now() / 1000);
			// set true, to let the remainder of the function know that this was not an auto-save
			overOperation = true;
		}

		//update info if provided
		if (options) {
			if (options.title) {
				this.title = options.title;
			}
			if (options.description) {
				this.description = options.description;
			}
			if (options.style) {
				this.style = options.style;
			}
			if (options.type) {
				this.type = options.type;
			}
			if (options.persist) {
				this.persist = options.persist;
			}
		}

		// save to DB only if intended
		if (this.persist) {
			// try / catch needed here, this could fail...
			try {
				// set new doc in firebase using custom id/name
				//const firebaseStore = get(fb);
				//const eventDoc = doc(firebaseStore.db, 'events', this.id);
				const documentData = this.exportObject();
				//await setDoc(eventDoc, documentData);
			} catch (e) {
				// event save failed
				console.error(e);
				// display an issue alert, but can't trigger another save. otherwise this will loop endlessly.
				const neverEnding = new MyEvent({
					type: 'event.failed',
					style: 'operation',
					title: 'Connection Lost',
					description:
						'Check your internet connection, or refresh the page. We are sorry for the inconvenience.',
					visibility: 'local',
					persist: false
				});
			}
		}

		// called on both persisted and non-persisted events
		if (this.visibility != 'none' && overOperation) {
			// this update will 'refresh' the store, by default. but also only set a destroy timer if the event is visible.
			alertStore.update((store) => {
				if (store.active) {
					if (store.active.id == this.id) {
						// queue destroy only if this was a visible operation, which previously had no destroy set.
						setTimeout(() => this.destroyAlert(), post_operation_visible_duration);
					}
				}
				return store;
			});
		}
	}
}

// This is the base Event object interface -> the type that can be saved to the database
interface Event {
	id: string;

	type: string; // user.email.updated / user.created
	visibility: string; // none, local, public
	style: string; // info, success, fail, operation
	persist?: boolean; // some popups may not be slated to be saved

	title: string;
	description: string;

	timestamp: Timestamp;
	unix_timestamp: number;
	timestamp_complete?: Timestamp;
	unix_timestamp_complete?: number;

	relations?: Relation[];
}
