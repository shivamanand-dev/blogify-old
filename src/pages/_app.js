import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import store, { persistor } from "@/store/store";
// import Navbar from "@/components/Navbar";
import theme from "@/utils/Theme/theme";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
          <NoSsr>
            {/* <Navbar /> */}
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
