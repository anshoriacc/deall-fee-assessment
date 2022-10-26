import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './Bookmark.module.scss';

import Layout from '../../Layout';
import Title from '../../components/Title';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';

import bookmarkContext from '../../contexts/bookmarks';

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const Bookmark = () => {
  const query = useQuery();
  const [bookmarkedBooks] = useContext(bookmarkContext);
  const [books, setBooks] = useState(bookmarkedBooks);
  const [meta, setMeta] = useState({
    page: query.get('page') ? parseInt(query.get('page')) : 1,
    offset: (query.get('page') ? parseInt(query.get('page')) - 1 : 0) * 20,
    limit: 20,
    count: bookmarkedBooks.length,
  });

  useEffect(() => {
    setMeta({
      ...meta,
      page: query.get('page') ? parseInt(query.get('page')) : 1,
      offset: (query.get('page') ? parseInt(query.get('page')) - 1 : 0) * 20,
      count: bookmarkedBooks.length,
    });
    setBooks(bookmarkedBooks.slice(meta.offset, meta.offset + meta.limit));
  }, [bookmarkedBooks, meta.page]);

  return (
    <Layout>
      <Title title="Bookmark" />
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h2>Bookmarks</h2>
          {bookmarkedBooks.length > 0 ? (
            <p>
              Showing{' '}
              <span>{`${meta.offset + 1} – ${
                meta.page === Math.ceil(meta.count / meta.limit)
                  ? meta.offset + (meta.count % meta.limit)
                  : meta.offset + meta.limit
              } `}</span>{' '}
              from
              <span>{` ${meta.count} `}</span> books.
            </p>
          ) : null}
        </div>
        <div className={styles.bottom}>
          {books && books.length > 0 ? (
            books.map((book) => (
              <>
                <Card key={book.id} data={book} />
              </>
            ))
          ) : (
            <div>Your bookmarks is empty.</div>
          )}
        </div>
        {books && books.length > 0 ? <Pagination meta={meta} /> : null}
      </div>
    </Layout>
  );
};

export default Bookmark;
