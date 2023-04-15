import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { userService } from "../services/user.services";
import app from ".";

const auth = getAuth(app);

const createUser = (data) => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      //   Signed in
      const user = userCredential.user;
      await userService.saveToken(user.accessToken);

      return user;
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      // ..
      //   console.log(error);
    });
};

export const authApi = { createUser };
