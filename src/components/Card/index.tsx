import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

import bookmark from '../../assets/icons/bookmark.svg';
import bookmarkFill from '../../assets/icons/bookmark-fill.svg';

import bookmarkContext from '../../contexts/bookmarks';

const Card = ({ data }) => {
  const [bookmarked, setBookmark] = useState(false);
  const [bookmarkedBooks, setBookmarkedBooks] = useContext(bookmarkContext);
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

  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    stored &&
      setBookmark(
        !JSON.parse(localStorage.getItem('bookmarks')).find(
          (element) => element.id === id
        )
          ? false
          : true
      );

    if (!!localStorage.getItem('bookmarks')) {
      setBookmarkedBooks([...JSON.parse(localStorage.getItem('bookmarks'))]);
    }

    return;
  }, [bookmarked]);

  const bookmarkHandler = () => {
    if (!bookmarked) {
      if (!bookmarkedBooks.find((element) => element.id === id)) {
        localStorage.setItem(
          'bookmarks',
          JSON.stringify([...bookmarkedBooks, data])
        );
        setBookmark(true);
      }
    } else {
      localStorage.setItem(
        'bookmarks',
        JSON.stringify(bookmarkedBooks.filter((element) => element.id !== id))
      );
      setBookmark(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookmark} onClick={bookmarkHandler}>
        <img src={bookmarked ? bookmarkFill : bookmark} alt="bookmark" />
      </div>
      <Link to={`/detail`} state={data} className={styles.link}>
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
