import Head from "next/head";

export default ({ children, title = "aagaard design studio · admin" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="shortcut icon"
        href="/static/favicon.png"
        type="image/x-icon"
      />
    </Head>
    <header>
      <h1>aagaard design studio · admin</h1>
    </header>
    {children}
  </div>
);
