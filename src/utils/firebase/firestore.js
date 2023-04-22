import { doc, getFirestore, setDoc } from "firebase/firestore";

import app from ".";

const db = getFirestore(app);

const addDocument = async (collectionName, username, data) => {
  const docRef = doc(db, collectionName, username);
  await setDoc(docRef, data);
};

export const firestoreApi = { addDocument };
