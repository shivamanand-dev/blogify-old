import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setBlogs } from "@/redux/blogsSlice";
import { setUser } from "@/redux/userSlice";
import { fireStoreCollections } from "@/utils/constants/app_constants";
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
        await firestoreApi.addDocument(username, {
          username: username,
          email: data.user.email,
          uid: data.user.uid,
          profileImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/blogify-9a1bd.appspot.com/o/anonymous.png?alt=media&token=4b23045c-6f36-4054-a026-02922bff24c6",
        });

        // await firestoreApi.addDocument("Blogs", username);
        await firestoreApi.addCollection(fireStoreCollections.blogs, username, {
          title: "My New Post",
          content: "Lorem ipsum dolor sit amet...",
          lastEdited: firestoreApi.now(),
        });
      }

      const userData = await firestoreApi.getDocument(username);
      const blogsData = await firestoreApi.getCollection(username);

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
