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
  updateDoc,
} from "firebase/firestore";

import { fireStoreCollections } from "@/utils/constants/app_constants";

import app from "..";

const db = getFirestore(app);

const createBlog = async (data) => {
  const collectionRef = collection(db, fireStoreCollections.blogs);
  return await addDoc(collectionRef, data);
};

const getBlog = async (condition, postLimit) => {
  const collectionRef = collection(db, fireStoreCollections.blogs);
  let myQuery;
  if (condition) {
    myQuery = query(
      collectionRef,
      orderBy("lastEdited", "desc"),
      limit(postLimit || 15),
      condition
    );
  } else {
    myQuery = query(
      collectionRef,
      orderBy("lastEdited", "desc"),
      limit(postLimit || 15)
    );
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

const getSinglePost = async (uid) => {
  const docRef = doc(db, fireStoreCollections.blogs, uid);
  const data = await getDoc(docRef);
  return data.data();
};

const updateBlog = async (uid, data) => {
  const docRef = doc(db, fireStoreCollections.blogs, uid);

  return await updateDoc(docRef, data).catch((error) => {
    console.error("Error updating Blog: ", error);
  });
};

export const blogServices = { createBlog, getBlog, updateBlog, getSinglePost };
