import Head from 'next/head';

export default ({ children, title = 'aagaard design studio - admin' }) => (
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
    <style jsx global>{`
      html {
        font-size: 16px;
      }

      body {
        background-color: #f7f7f7;
        font-family: Helvetica Neue, Helvetica, sans-serif;
        margin: auto;
        max-width: 90ch;
        padding: 2ch;
      }

      button,
      input[type='submit'] {
        background-color: #f7f7f7;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.75rem;
        padding: 0.25rem 0.75rem;
      }

      button:focus,
      input[type='submit'] {
        outline: none;
      }

      input[type='text'],
      input[type='number'] {
        border-radius: 0.25rem;
        border: 1px solid darkgray;
        font-size: 0.75rem;
        margin-top: 0.25rem;
        padding: 0.25rem;
        width: 100%;
      }

      .btn--primary {
        border: 2px solid lightseagreen;
        color: lightseagreen;
        font-size: 0.75rem;
      }

      .btn--primary:hover {
        background-color: lightseagreen;
        color: #f7f7f7;
      }
    `}</style>
    <header>
      <h1>aagard design studio - admin</h1>
    </header>

    {children}
  </div>
);
