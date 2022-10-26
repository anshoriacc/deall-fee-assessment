import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

import bookmark from '../../assets/icons/bookmark.svg';
import bookmarkFill from '../../assets/icons/bookmark-fill.svg';

const Card = ({ data }) => {
  const {
    id,
    title,
    cover_url,
    authors,
    category_id,
    description,
    sections,
    audio_length,
  } = data;

  const [bookmarkHover, setBookmarkHover] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={styles.bookmark}
        onMouseEnter={() => {
          setBookmarkHover(true);
        }}
        onMouseLeave={() => {
          setBookmarkHover(false);
        }}
      >
        <img src={bookmarkHover ? bookmarkFill : bookmark} alt="bookmark" />
      </div>
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
    </div>
  );
};

export default Card;
