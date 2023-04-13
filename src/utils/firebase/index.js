import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyARK58x30wkMWf0mANs8ifooW3_zaVnvQA",
  authDomain: "blogify-9a1bd.firebaseapp.com",
  projectId: "blogify-9a1bd",
  storageBucket: "blogify-9a1bd.appspot.com",
  messagingSenderId: "937430904324",
  appId: "1:937430904324:web:a38bf7a2beccbe99378f51",
  measurementId: "G-4KD0406J64",
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export default app;
