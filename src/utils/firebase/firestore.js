import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { fireStoreCollections } from "../constants/app_constants";
import app from ".";

const db = getFirestore(app);

const addDocument = async (username, data) => {
  const docRef = doc(db, fireStoreCollections.users, username);
  await setDoc(docRef, data);
};

const addCollection = async (newCollection, username, data) => {
  const docRef = doc(db, fireStoreCollections.users, username);

  await addDoc(collection(docRef, newCollection), data);
};

const getDocument = async (username) => {
  const docRef = doc(db, fireStoreCollections.users, username);
  const data = await getDoc(docRef);

  return data.data();
};

const updateData = async (username, data) => {
  const docRef = doc(db, fireStoreCollections.users, username);

  return await updateDoc(docRef, data);
};

const now = Timestamp.now();

export const firestoreApi = {
  addDocument,
  addCollection,
  getDocument,
  updateData,
  now,
};
