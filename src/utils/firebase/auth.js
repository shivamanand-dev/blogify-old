import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

// import { userService } from "../services/user.services";
import app from ".";

const auth = getAuth(app);

// const afterAuth = async (userCredential) => {
//   // Signed in
//   const user = userCredential.user;
//   await userService.saveToken(user.accessToken);

//   return user;
//   // ...
// };

const createUser = async (data) => {
  return await createUserWithEmailAndPassword(auth, data.email, data.password)
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {});
};

const loginUser = async (data) => {
  return await signInWithEmailAndPassword(auth, data.email, data.password)
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {});
};

const logout = async () => {
  localStorage.removeItem("persist:root");
  return auth.signOut();
};

export const authApi = { createUser, loginUser, logout };
