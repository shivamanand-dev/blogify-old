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

import app from ".";

const db = getFirestore(app);

const addDocument = async (email, collectionName, data) => {
  const docRef = doc(db, collectionName, email);
  await setDoc(docRef, data);
};

const addCollection = async (collectionName, newCollection, email, data) => {
  const docRef = doc(db, collectionName, email);

  await addDoc(collection(docRef, newCollection), data);
};

const getDocument = async (collectionName, email) => {
  const docRef = doc(db, collectionName, email);
  const data = await getDoc(docRef);

  return data.data();
};

const getCollection = async (collectionName, email) => {
  const docRef = doc(db, collectionName, email);
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

const updateData = async (collectionName, email, data) => {
  const docRef = doc(db, collectionName, email);

  return await updateDoc(docRef, data);
};

const updateCollectionData = async (
  collectionName,
  mySubcollection,
  email,
  data
) => {
  const docRef = doc(db, collectionName, email);

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
