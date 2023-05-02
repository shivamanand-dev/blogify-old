import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setBlogs } from "@/redux/blogsSlice";
import { setUser } from "@/redux/userSlice";
import { fireStoreCollections } from "@/utils/constants/app_constants";
import { authApi } from "@/utils/firebase/auth";
import { firestoreApi } from "@/utils/firebase/firestore";

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
        await firestoreApi.addDocument(data.user.email, {
          email: data.user.email,
          uid: data.user.uid,
          profileImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/blogify-9a1bd.appspot.com/o/anonymous.png?alt=media&token=4b23045c-6f36-4054-a026-02922bff24c6",
        });

        // await firestoreApi.addDocument("Blogs", data.user.email);
        await firestoreApi.addCollection(
          fireStoreCollections.blogs,
          data.user.email,
          {
            title: "My New Post",
            content: "Lorem ipsum dolor sit amet...",
            lastEdited: firestoreApi.now,
          }
        );
      }

      const userData = await firestoreApi.getDocument(data.user.email);
      const blogsData = await firestoreApi.getCollection(data.user.email);

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
