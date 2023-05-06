import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { fireStoreCollections } from "@/utils/constants/app_constants";

import app from "..";

const db = getFirestore(app);

const createBlog = async (data) => {
  const collectionRef = collection(db, fireStoreCollections.blogs);
  await addDoc(collectionRef, data);
};

const getBlog = async (condition) => {
  const collectionRef = collection(db, fireStoreCollections.blogs);
  let myQuery;
  if (condition) {
    myQuery = query(
      collectionRef,
      orderBy("lastEdited", "desc"),
      limit(15),
      // where("uid", "==", "R7SlgSZKSaswVl2vPBHj1fXkdzixl2")
      condition
    );
  } else {
    myQuery = query(collectionRef, orderBy("lastEdited", "desc"), limit(5));
  }

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

const updateBlog = async (uid, data) => {
  const docRef = doc(db, fireStoreCollections.blogs, uid);

  return await updateDoc(docRef, data)
    .then(() => {
      alert("Subcollection document updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating subcollection document: ", error);
    });
};

export const blogServices = { createBlog, getBlog, updateBlog };
