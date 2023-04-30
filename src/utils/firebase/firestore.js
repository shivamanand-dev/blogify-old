import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
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

const getCollection = async (username) => {
  const docRef = doc(db, fireStoreCollections.users, username);
  const subCollection = collection(docRef, "Blogs");

  const myQuery = query(subCollection, orderBy("lastEdited", "desc"), limit(5));

  return await getDocs(myQuery)
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      console.log(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
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
  getCollection,
  updateData,
  now,
};
