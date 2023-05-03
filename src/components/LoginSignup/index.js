import { where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setBlogs } from "@/redux/blogsSlice";
import { setUser } from "@/redux/userSlice";
import { authApi } from "@/utils/firebase/auth";
import { blogServices } from "@/utils/firebase/services/blogServices";
import { userServices } from "@/utils/firebase/services/userServices";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputField";
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
      if (activeForm === "signUp") {
        await userServices.addUser(
          data.user.email,

          {
            email: data.user.email,
            uid: data.user.uid,
            profileImageUrl:
              "https://firebasestorage.googleapis.com/v0/b/blogify-9a1bd.appspot.com/o/anonymous.png?alt=media&token=4b23045c-6f36-4054-a026-02922bff24c6",
          }
        );
      }

      const userData = await userServices.getUser(data.user.email);
      const blogsData = await blogServices.getBlog(
        where("uid", "==", data.user.uid)
      );

      dispatch(setUser(userData));
      dispatch(setBlogs(blogsData));
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
