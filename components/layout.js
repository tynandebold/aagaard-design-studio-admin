import Head from 'next/head';

export default ({ children, title = 'aagaard design studio - admin' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style jsx global>{`
      body {
        background-color: #f7f7f7;
        font-family: Helvetica Neue, Helvetica, sans-serif;
        margin: auto;
        max-width: 70ch;
        padding: 2ch;
      }
    `}</style>
    <header>
      <h1>aagard design studio - admin</h1>
    </header>

    {children}
  </div>
);
