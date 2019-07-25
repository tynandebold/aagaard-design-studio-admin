import App, { Container } from "next/app";
import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    background: "#f7f7f7",
    delete: "indianred",
    primary: "lightseagreen",
    toasterFailure: "orangered",
    toasterSuccess: "springgreen"
  }
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    background-color: ${theme.colors.background};
    font-family: Helvetica Neue, Helvetica, sans-serif;
    margin: auto;
    max-width: 80ch;
    padding: 2ch;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
