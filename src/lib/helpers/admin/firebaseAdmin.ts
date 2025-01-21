// firebase admin connection for server side only.

import { firebaseAdminConfig } from "$lib/config";
import {
  getApp,
  initializeApp,
  applicationDefault,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

let adminApp: App;

/**
 * connect and return the app instance, or just return the app instance if already connected
 */
function getAdminApp() {
  try {
    adminApp = initializeApp({
      credential: cert({
        projectId: firebaseAdminConfig.projectId,
        clientEmail: firebaseAdminConfig.clientEmail,
        privateKey: firebaseAdminConfig.privateKey?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (e) {
    adminApp = getApp();
  }

  return adminApp;
}

/**
 * Connects the app instance if needed, and returns a reference to the admin firestore
 */
export function getAdminFirestore() {
  if (!adminApp) {
    adminApp = getAdminApp();
  }

  return getFirestore();
}
