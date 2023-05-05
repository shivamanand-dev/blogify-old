import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { fireStoreCollections } from "@/utils/constants/app_constants";

import app from "..";

const db = getFirestore(app);

const addUser = async (email, data) => {
  const docRef = doc(db, fireStoreCollections.users, email);
  await setDoc(docRef, data);
};

const getUser = async (email) => {
  const docRef = doc(db, fireStoreCollections.users, email);
  const data = await getDoc(docRef);

  return data.data();
};

const updateUser = async (email, data) => {
  const docRef = doc(db, fireStoreCollections.users, email);

  return await updateDoc(docRef, data);
};

export const userServices = {
  addUser,
  getUser,
  updateUser,
};
