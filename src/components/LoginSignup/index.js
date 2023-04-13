import { PrimaryButton } from "../Buttons";
import InputField from "../InputBox";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
  return (
    <StyledLoginSignup>
      <InputField />
      <InputField />

      <PrimaryButton buttonText={activeForm} />
    </StyledLoginSignup>
  );
}

export default LoginSignup;
