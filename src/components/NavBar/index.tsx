import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.scss';

import book from '../../assets/icons/book.svg';
import bookmarks from '../../assets/icons/bookmarks.svg';
import bookmarksFill from '../../assets/icons/bookmarks-fill.svg';

const NavBar = () => {
  const [bookmarksHover, setBookmarksHover] = useState(false);

  return (
    <header>
      <nav>
        <NavLink to="/" className={styles.brand}>
          <img src={book} alt="logo" />
          <span>BluBooks</span>
        </NavLink>
        <NavLink to="/bookmark">
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
