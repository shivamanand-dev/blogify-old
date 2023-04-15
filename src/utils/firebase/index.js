import { initializeApp } from "firebase/app";

import {
  firebase_apiKey,
  firebase_appId,
  firebase_authDomain,
  firebase_measurementId,
  firebase_messagingSenderId,
  firebase_projectId,
  firebase_storageBucket,
} from "@/utils/constants/app_config";

const firebaseConfig = {
  apiKey: firebase_apiKey,
  authDomain: firebase_authDomain,
  projectId: firebase_projectId,
  storageBucket: firebase_storageBucket,
  messagingSenderId: firebase_messagingSenderId,
  appId: firebase_appId,
  measurementId: firebase_measurementId,
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export default app;
