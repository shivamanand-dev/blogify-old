import { Container } from "@mui/material";

import LoginSignup from "@/components/LoginSignup";

function SignUp() {
  return (
    <Container>
      <LoginSignup activeForm="signUp" />
    </Container>
  );
}

export default SignUp;
