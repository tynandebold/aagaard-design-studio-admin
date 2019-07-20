import React from 'react';
import Link from 'next/link';

import Contact from './contact';

const Nav = ({ page, projectTitle }) => (
  <nav>
    {page === 'home' ? (
      <>
        <Link href="/=">
          <a className="nav-link--first" style={{ color: '#fff' }}>
            Work
          </a>
        </Link>
        <Link href="/about">
          <a style={{ color: '#fff', opacity: 0.4 }}>Info</a>
        </Link>
        <div className="project-title">{projectTitle}</div>
      </>
    ) : (
      <>
        <Link href="/">
          <a
            className="nav-link--first"
            style={{ color: '#0d0d0d', opacity: 0.4 }}
          >
            Work
          </a>
        </Link>
        <Link href="/about">
          <a style={{ color: '#0d0d0d' }}>Info</a>
        </Link>
        <Contact />
      </>
    )}
  </nav>
);

export default Nav;
