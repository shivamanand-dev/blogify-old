import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import MainNavbar from "@/components/MainNavbar";
import { persistor, store } from "@/redux/store";
import app from "@/utils/firebase";
import { authApi } from "@/utils/firebase/auth";
import theme from "@/utils/Theme/theme";

export default function App({ Component, pageProps }) {
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        authApi.logout();
        router.push("/login");
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
          <NoSsr>
            <MainNavbar />
            <div style={{ height: "64px" }}></div>
            <Container>
              <Component {...pageProps} />
            </Container>
          </NoSsr>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
