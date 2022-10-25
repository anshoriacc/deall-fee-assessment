import React from 'react';

import styles from './Card.module.scss';

const Card = () => {
  return (
    <a href="/" className={styles.link}>
      <div className={styles.wrapper}></div>
    </a>
  );
};

export default Card;
