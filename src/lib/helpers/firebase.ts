import { firebaseClientConfig } from '../../config';
import { fb } from '$lib/stores/firebase';
import { MyEvent } from '$lib/types/Event';

/**
 * Handle failures and retries
 */
export async function connectionHandler() {
	let result = await connect();

	if (result.error) {
		// set alert and retry
		let retryAlert = new MyEvent({
			type: 'firebase.connection.retry',
			style: 'operation',
			title: 'One Moment',
			description: "Something went wrong connecting to the API. We're retrying.",
			visibility: 'local',
			persist: true
		});

		let result2 = await connect();

		if (result2.error) {
			// update alert and ask to refresh.
			let failAlert = new MyEvent({
				type: 'firebase.connection.failed',
				style: 'fail',
				title: 'Connection Failed',
				description:
					'Check your internet connection, or refresh the page. We are sorry for the inconvenience',
				visibility: 'local',
				persist: true
			});
			retryAlert.destroyAlert();
		}
	}
}

/**
 * Establish connection to services and populate fb store
 *
 */
export async function connect() {
	let connectionResult = {
		connected: false,
		error: false,
		message: ''
	};

	if (typeof window !== 'undefined') {
		console.log('[firebase] connecting...');
		try {
			const appModule = await import('firebase/app');
			const firestoreModule = await import('firebase/firestore');
			const storageModule = await import('firebase/storage');
			const authModule = await import('firebase/auth');

			// ** PUBLIC VARIABLES **

			// Initialize Firebase
			const app = appModule.initializeApp(firebaseClientConfig, 'rvfleet-dev');
			const auth = authModule.getAuth(app);
			const db = firestoreModule.getFirestore(app);
			const storage = storageModule.getStorage(app);

			fb.set({
				app: app,
				auth: auth,
				db: db,
				storage: storage
			});

			connectionResult.connected = true;

			console.log('[firebase] connected.');
		} catch (e) {
			console.error(e);
			connectionResult.error = true;
			connectionResult.message = e as string;
			connectionResult.connected = false;
		}
	}

	return connectionResult;
}
