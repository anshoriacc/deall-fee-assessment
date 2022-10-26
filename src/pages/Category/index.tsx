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
  const { search } = useLocation();
  const [meta, setMeta] = useState({
    page: query.get('page') ? parseInt(query.get('page')) : 1,
    offset: (query.get('page') ? parseInt(query.get('page')) - 1 : 0) * 20,
    limit: 20,
    count: require(`../../data/${id}.json`).length,
  });
  const [books, setBooks] = useState(
    require(`../../data/${id}.json`).slice(
      meta.offset,
      meta.offset + meta.limit
    )
  );

  useEffect(() => {
    setMeta({
      ...meta,
      page: query.get('page') ? parseInt(query.get('page')) : 1,
      offset: (query.get('page') ? parseInt(query.get('page')) - 1 : 0) * 20,
      count: require(`../../data/${id}.json`).length,
    });
    setBooks(
      require(`../../data/${id}.json`).slice(
        meta.offset,
        meta.offset + meta.limit
      )
    );
  }, [id, search]);

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
            <span>{`${meta.offset + 1} – ${
              meta.page === Math.ceil(meta.count / meta.limit)
                ? meta.offset + (meta.count % meta.limit)
                : meta.offset + meta.limit
            } `}</span>{' '}
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
