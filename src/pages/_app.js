import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { getAuth } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import MainNavbar from "@/components/MainNavbar";
import ProgressBar from "@/components/ProgressBar";
import { persistor, store } from "@/redux/store";
import {
  app_routes,
  authRoutes,
  lockedRoutes,
} from "@/utils/constants/app_constants";
import app from "@/utils/firebase";
import { authApi } from "@/utils/firebase/auth";
import theme from "@/utils/theme/theme";

export default function App({ Component, pageProps }) {
  const auth = getAuth(app);
  const router = useRouter();

  const routeCheck = () => {
    auth.onAuthStateChanged((user) => {
      if (!user && lockedRoutes.includes(router.asPath)) {
        authApi.logout();
        router.push("/login");
      } else if (user && authRoutes.includes(router.asPath)) {
        router.push(app_routes.explore);
      }
    });
  };

  useEffect(() => {
    routeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

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

          <meta
            name="description"
            content="Welcome to Our Blogging Community. Join thousands of writers and readers around the world."
          ></meta>

          <meta
            name="keywords"
            content="Blogging platform,Content management system,Blogging software,Website builder,Blog hosting,Writing platform,Content creation tool,SEO optimization,Customizable templates,User-friendly interface,Social media integration,Analytics and tracking,Mobile responsiveness,Monetization options,Community and engagement features,Multimedia support (images, videos),Search functionality,RSS feed integration,Author profiles,Commenting system"
          ></meta>

          <meta
            name="author"
            content="Welcome to Our Blogging Community. Join thousands of writers and readers around the world."
          ></meta>

          <meta name="robots" content="index, follow"></meta>
          <link rel="canonical" href="https://appstorm.app/"></link>
          <meta
            name="og:title"
            content="Welcome to Our Blogging Community. Join thousands of writers and readers around the world."
          ></meta>
          <meta
            name="og:description"
            content="Welcome to Our Blogging Community. Join thousands of writers and readers around the world."
          ></meta>
          <meta name="og:image" content=""></meta>

          <title>AppStorm - Blogify</title>
        </Head>
        <ThemeProvider theme={theme}>
          <NoSsr>
            <ProgressBar />
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
