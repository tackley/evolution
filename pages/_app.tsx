import "../styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Evolution</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* <ThemeProvider theme={}> */}
      <CssBaseline />
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </React.Fragment>
  );
}
