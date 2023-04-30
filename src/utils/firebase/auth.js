import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import app from ".";

const auth = getAuth(app);

const createUser = async (data) => {
  return await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  ).catch((error) => {
    return error;
  });
};

const loginUser = async (data) => {
  return await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  ).catch((error) => {
    return error.code;
  });
};

const logout = async () => {
  localStorage.clear();
  await auth.signOut();
};

export const authApi = {
  createUser,
  loginUser,
  logout,
};
