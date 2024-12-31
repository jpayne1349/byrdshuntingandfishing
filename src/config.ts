let process: NodeJS.ProcessEnv | undefined;

const p = process?.env ? process.env : import.meta.env;

export const firebaseClientConfig = {
	//@ts-ignore
	apiKey: p.VITE_FIREBASE_APIKEY,
	//@ts-ignore
	authDomain: p.VITE_FIREBASE_AUTHDOMAIN,
	//@ts-ignore
	projectId: p.VITE_FIREBASE_PROJECTID,
	//@ts-ignore
	storageBucket: p.VITE_FIREBASE_STORAGEBUCKET,
	//@ts-ignore
	messagingSenderId: p.VITE_FIREBASE_MESSAGINGSENDERID,
	//@ts-ignore
	appId: p.VITE_FIREBASE_APPID,
	//@ts-ignore
	measurementId: p.VITE_FIREBASE_MEASUREMENTID
};

export const sendgridConfig = {
	//@ts-ignore
	apiKey: p.VITE_SENDGRID_API_KEY
};

export const stripeConfig = {
	//@ts-ignore
	privateKey: p.VITE_STRIPE_PRIVATE_KEY,
	//@ts-ignore
	publicKey: p.VITE_STRIPE_PUBLIC_KEY
};

export const firebaseAdminConfig = {
	//@ts-ignore
	projectId: p.VITE_FIREBASE_ADMIN_PROJECT_ID,
	//@ts-ignore
	privateKey: p.VITE_FIREBASE_ADMIN_PRIVATE_KEY,
	//@ts-ignore
	clientEmail: p.VITE_FIREBASE_ADMIN_CLIENT_EMAIL
};

export const adminConfig = {
	//@ts-ignore
	account_token: p.VITE_CREATE_ACCOUNT_ADMIN_TOKEN
};