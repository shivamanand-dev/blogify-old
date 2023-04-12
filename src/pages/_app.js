import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { ThemeProvider } from "styled-components";

// import Navbar from "@/components/Navbar";
import theme from "@/utils/Theme/theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <NoSsr>
        {/* <Navbar /> */}
        <div style={{ height: "64px" }}></div>
        <Container>
          <Component {...pageProps} />
        </Container>
      </NoSsr>
    </ThemeProvider>
  );
}
