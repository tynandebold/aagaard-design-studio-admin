import Link from 'next/link';

const Header = ({ dark }) => (
  <header>
    <div>
      <h1 style={{ fontSize: `1rem`, margin: 0 }}>
        <Link href="/">
          <a
            style={{
              color: dark ? `white` : `#0d0d0d`,
              textDecoration: `none`
            }}
          >
            aagaard design studio.
          </a>
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
