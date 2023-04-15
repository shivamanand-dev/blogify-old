import { useRouter } from "next/router";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputBox";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
  const router = useRouter();
  const { login, signup } = useAuth();

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
        ? await login(loginDetails)
        : await signup(loginDetails);

    if (data) {
      router.push("/feed");
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
