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
        const parsedData = {
          id: doc.id,
          data: doc.data(),
        };
        data.push(parsedData);
      });

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

const updateCollectionData = async (mySubcollection, username, data) => {
  const docRef = doc(db, fireStoreCollections.users, username);

  const myCollection = collection(docRef, mySubcollection);

  const subDocRef = doc(myCollection, "subDocumentId");

  return await updateDoc(subDocRef, data)
    .then(() => {
      alert("Subcollection document updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating subcollection document: ", error);
    });
};

const now = Timestamp.now();

export const firestoreApi = {
  addDocument,
  addCollection,
  getDocument,
  getCollection,
  updateData,
  updateCollectionData,
  now,
};
