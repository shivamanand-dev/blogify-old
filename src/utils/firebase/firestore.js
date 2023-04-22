import { doc, getFirestore, setDoc } from "firebase/firestore";

import app from ".";

const db = getFirestore(app);

const addDocument = async (collectionName, emailId, data) => {
  const docRef = doc(db, collectionName, emailId);
  await setDoc(docRef, data);
};

export const firestoreApi = { addDocument };
