import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import app from ".";

const db = getFirestore(app);

const addDocument = async (collectionName, username, data) => {
  const docRef = doc(db, collectionName, username);
  await setDoc(docRef, data);
};

const getDocument = async (collectionName, username) => {
  const docRef = doc(db, collectionName, username);
  const data = await getDoc(docRef);
  return data.data();
};

const updateData = async (collectionName, username, data) => {
  const docRef = doc(db, collectionName, username);

  return await updateDoc(docRef, data);
};

const now = Timestamp.now();

export const firestoreApi = { addDocument, getDocument, updateData, now };
