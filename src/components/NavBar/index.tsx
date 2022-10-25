import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.scss';

import bookmarks from '../../assets/icons/bookmarks.svg';
import bookmarksFill from '../../assets/icons/bookmarks-fill.svg';

const NavBar = () => {
  const [bookmarksHover, setBookmarksHover] = useState(false);

  return (
    <header>
      <nav>
        <NavLink to="/" className={styles.brand}>
          <img
            src="https://sejutacita.id/static/media/logo-bg-new.14982478.png"
            alt="sejutacita.id logo"
          />
          <span>Books</span>
        </NavLink>
        <div>Kategori</div>
        <NavLink to="/">
          <button
            className={styles.bookmarks}
            onMouseEnter={() => {
              setBookmarksHover(true);
            }}
            onMouseLeave={() => {
              setBookmarksHover(false);
            }}
          >
            <img
              src={bookmarksHover ? bookmarksFill : bookmarks}
              alt="bookmarks icon"
            />
            <span>Bookmarks</span>
          </button>
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
