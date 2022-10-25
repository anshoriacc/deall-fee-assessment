import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import categories from '../../data/categories.json';

const Footer = () => {
  return (
    <footer>
      <div className={styles.wrapper}>
        <div className={styles.brand}>
          <Link to="/">
            <img
              src="https://sejutacita.id/static/media/logo-bg-new.14982478.png"
              alt="sejutacita.id logo"
            />
            <span>Books</span>
          </Link>
          <p>© 2022 Achmad Anshori.</p>
          <p>
            Only for <a href="https://usedeall.com/">Deall</a>
            's technical test purpose.
          </p>
        </div>
        <div>
          <div className={styles.categories}>
            <h4>Categories</h4>
            {categories
              ? categories.map((category) => (
                  <Link to={`/category/${category.id}`} key={category.id}>
                    {category.name}
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
