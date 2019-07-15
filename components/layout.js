import Head from 'next/head';
import Header from '../components/public/header';

export default ({
  children,
  darkTheme,
  pageClass,
  title = 'aagaard design studio - admin'
}) => (
  <div
    className={`content-wrapper ${pageClass} ${
      darkTheme ? 'dark-theme' : 'light-theme'
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
    </Head>
    {pageClass === 'portfolio' && <Header dark={darkTheme} />}
    <main>{children}</main>
  </div>
);
