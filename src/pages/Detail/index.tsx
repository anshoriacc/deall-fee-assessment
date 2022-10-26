import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './Detail.module.scss';

import home from '../../assets/icons/home.svg';
import right from '../../assets/icons/chevron-right.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import bookmarkFill from '../../assets/icons/bookmark-fill.svg';

import Title from '../../components/Title';
import Layout from '../../Layout';

import categories from '../../data/categories.json';

import bookmarkContext from '../../contexts/bookmarks';

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bookmarked, setBookmark] = useState(false);
  const [bookmarkedBooks, setBookmarkedBooks] = useContext(bookmarkContext);

  const id = state && state.id;
  const title = state && state.title;
  const cover_url = state && state.cover_url;
  const authors = state && state.authors;
  const category_id = state && state.category_id;
  const description = state && state.description;
  const sections = state && state.sections;
  const audio_length = state && state.audio_length;

  useEffect(() => {
    if (!state) {
      navigate('/');
    }

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
  }, []);

  const categoryText =
    category_id &&
    categories.find((category) => category.id === parseInt(category_id)).name;

  const bookmarkHandler = () => {
    if (!bookmarked) {
      if (!bookmarkedBooks.find((element) => element.id === id)) {
        localStorage.setItem(
          'bookmarks',
          JSON.stringify([...bookmarkedBooks, state])
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
    <Layout>
      <Title title={title} />
      <div className={styles.navigation}>
        <img src={home} alt="home" className={styles.home} />
        <img src={right} alt="" />
        <Link to={`/category/${category_id}`}>
          <h4>{categoryText}</h4>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.bookmark} onClick={bookmarkHandler}>
          <img src={bookmarked ? bookmarkFill : bookmark} alt="bookmark" />
        </div>
        <div className={styles['image-wrapper']}>
          <img src={cover_url} alt={title} />
        </div>
        <div className={styles['right-container']}>
          <h1>{title}</h1>
          <p>
            <span>Author:</span>{' '}
            {authors
              ? authors.map(
                  (author, index) =>
                    author + (index === authors.length - 1 ? null : ', ')
                )
              : null}
          </p>
          <p>
            <span>Audio length: </span>
            {audio_length} minutes.
          </p>
          <h5>Description</h5>
          <p>{description}</p>
          <h5>Section</h5>
          {sections &&
            sections.map((section, index) => (
              <div key={index}>
                <h6>{section.title}</h6>
                <p>{section.content}</p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
