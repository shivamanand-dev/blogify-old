import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "@/store/store";
import { authApi } from "@/utils/firebase/auth";
// import Navbar from "@/components/Navbar";
import theme from "@/utils/Theme/theme";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const user = authApi.getUser();

    if (!user) {
      return router.push("/login");
    }
  }, []);

  return (
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
  );
}
