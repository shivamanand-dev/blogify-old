import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { getAuth } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import CreatePostButton from "@/components/CreatePostButton";
import MainNavbar from "@/components/MainNavbar";
import { persistor, store } from "@/redux/store";
import { lockedRoutes } from "@/utils/constants/app_constants";
import app from "@/utils/firebase";
import { authApi } from "@/utils/firebase/auth";
import theme from "@/utils/theme/theme";

export default function App({ Component, pageProps }) {
  const auth = getAuth(app);
  const router = useRouter();

  const routeCheck = () => {
    if (lockedRoutes.includes(router.asPath)) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          authApi.logout();
          router.push("/login");
        }
      });
    }
  };

  useEffect(() => {
    routeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1938389227797119"
            crossorigin="anonymous"
            lazyOnload
          ></script>
        </Head>
        <ThemeProvider theme={theme}>
          <NoSsr>
            <MainNavbar />
            <div style={{ height: "64px" }}></div>
            <Container>
              <Component {...pageProps} />
            </Container>
            <CreatePostButton />
          </NoSsr>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
