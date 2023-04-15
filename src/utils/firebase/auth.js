import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
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
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {});
};

const loginUser = async (data) => {
  return await signInWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      return await afterAuth(userCredential);
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {});
};

export const authApi = { createUser, loginUser };
