/* eslint-disable no-unused-vars */
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { userService } from "../services/user.services";
import app from ".";

const auth = getAuth(app);

const updateUser = async (displayName, photoURL) => {
  updateProfile(auth.currentUser, {
    displayName: displayName,
    photoURL: photoURL,
  })
    .then((res) => {
      // Profile updated!
      // console.log("fdsf");
      // console.log(res);
      return res;
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};

export const authApi = { updateUser };
