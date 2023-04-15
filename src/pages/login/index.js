import { Container } from "@mui/material";
import React from "react";

import LoginSignup from "../../components/LoginSignup";

function Login() {
  return (
    <Container>
      <LoginSignup activeForm="login" />
    </Container>
  );
}

export default Login;
