import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "@/context/AuthContext";
import store from "@/redux/store";
// import Navbar from "@/components/Navbar";
import theme from "@/utils/Theme/theme";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NoSsr>
            {/* <Navbar /> */}
            <div style={{ height: "64px" }}></div>
            <Container>
              <Component {...pageProps} />
            </Container>
          </NoSsr>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
}
