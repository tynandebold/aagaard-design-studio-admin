import Head from "next/head";
import Header from "../components/public/header";

export default ({
  children,
  darkTheme,
  pageClass,
  title = "admin · aagaard design studio."
}) => (
  <div
    className={`content-wrapper ${pageClass} ${
      darkTheme ? "dark-theme" : "light-theme"
    }`}
  >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="shortcut icon"
        href="/static/favicon.png"
        type="image/x-icon"
      />
      <meta
        name="description"
        content="A Copenhagen–based, one-man army design studio."
      />
      <meta property="og:title" content="home" />
      <meta
        property="og:description"
        content="A Copenhagen–based, one-man army design studio."
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="Frederik Aagaard" />
      <meta name="twitter:title" content="home" />
      <meta
        name="twitter:description"
        content="A Copenhagen–based, one-man army design studio."
      />
      <meta
        name="keywords"
        content="aagaard design studio, Frederik Aagaard, design, design studio, creative advisor, creative director, copenhagen, charlie tango, danske bank, denmark"
      />
    </Head>
    {pageClass === "portfolio" && <Header dark={darkTheme} />}
    <main>{children}</main>
  </div>
);
