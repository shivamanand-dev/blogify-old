import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/redux/userSlice";
import { authApi } from "@/utils/firebase/auth";
import { firestoreApi } from "@/utils/firebase/firestore";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputBox";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const onClickSubmit = async () => {
    const data =
      activeForm === "login"
        ? await authApi.loginUser(loginDetails)
        : await authApi.createUser(loginDetails);

    if (data.user) {
      const username = data.user.email.split("@")[0];

      if (activeForm === "signUp") {
        await firestoreApi.addDocument("user", username, {
          username: username,
          email: data.user.email,
          uid: data.user.uid,
          profileImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/blogify-9a1bd.appspot.com/o/anonymous.png?alt=media&token=4b23045c-6f36-4054-a026-02922bff24c6",
        });
      }

      const userData = await firestoreApi.getDocument("user", username);

      dispatch(setUser(userData));
      router.push("/feed");
    } else {
      alert(data);
    }
  };
  return (
    <StyledLoginSignup>
      <InputField name="email" onChange={onChangeInput} />
      <InputField name="password" type="password" onChange={onChangeInput} />

      <PrimaryButton buttonText={activeForm} onClick={onClickSubmit} />
    </StyledLoginSignup>
  );
}

export default LoginSignup;
