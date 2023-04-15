import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/store/user";
import { authApi } from "@/utils/firebase/auth";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputBox";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
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

    dispatch(setUser(data));
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
