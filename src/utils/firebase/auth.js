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

const afterAuth = async (userCredential) => {
  // Signed in
  const user = userCredential.user;
  await userService.saveToken(user.accessToken);

  return user;
  // ...
};

const createUser = async (data) => {
  return await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      return await afterAuth(userCredential);
    })
    .catch((error) => {});
};

const loginUser = async (data) => {
  return await setPersistence(auth, browserLocalPersistence)
    .then(async () => {
      return await signInWithEmailAndPassword(auth, data.email, data.password);
    })
    .catch((error) => {});
};

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

export const authApi = { createUser, loginUser, updateUser };
