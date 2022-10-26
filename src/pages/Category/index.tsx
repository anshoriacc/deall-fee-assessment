import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import styles from './Category.module.scss';

import Layout from '../../Layout';
import Title from '../../components/Title';
import Card from '../../components/Card';

import categories from '../../data/categories.json';

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const Category = () => {
  const { id } = useParams();
  const query = useQuery();
  const [meta, setMeta] = useState({
    page: 1,
    offset: 0,
    limit: 20,
    count: 0,
  });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(require(`../../data/${id}.json`).slice(meta.offset, meta.limit));
    setMeta({
      ...meta,
      page: query.get('page') ? parseInt(query.get('page')) : 1,
      offset: (query.get('page') ? parseInt(query.get('page')) - 1 : 0) * 20,
      count: require(`../../data/${id}.json`).length,
    });

    console.log('Meta', meta);
    console.log('page', parseInt(query.get('page')));
    console.log('books', books);
  }, [query.get('page'), id]);

  const categoryText = categories.find(
    (category) => category.id === parseInt(id)
  ).name;

  return (
    <Layout>
      <Title title={categoryText} />
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h2>{categoryText}</h2>
          <p>
            Showing{' '}
            <span>{`${meta.offset + 1} – ${meta.offset + meta.limit} `}</span>{' '}
            from
            <span>{` ${meta.count} `}</span> books.
          </p>
        </div>
        <div className={styles.bottom}>
          {books
            ? books.map((book) => <Card key={book.id} data={book} />)
            : null}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
