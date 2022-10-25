import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

const Card = ({ data }) => {
  const {
    id,
    title,
    cover_url,
    category_id,
    authors,
    description,
    sections,
    audio_length,
  } = data;

  return (
    <Link to={`/${id}`} className={styles.link}>
      <div className={styles.wrapper}>
        <div className={styles['image-wrapper']}>
          <img src={cover_url} alt={title} />
        </div>
        <h3>{title}</h3>
        <div className={styles.authors}>
          <span>
            {authors
              ? authors.map(
                  (author, index) =>
                    author + (index === authors.length - 1 ? null : ', ')
                )
              : null}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
