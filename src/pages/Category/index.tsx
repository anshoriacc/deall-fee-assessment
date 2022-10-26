import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './Category.module.scss';

import Layout from '../../Layout';
import Title from '../../components/Title';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';

import categories from '../../data/categories.json';

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const Category = () => {
  const { id } = useParams();
  const query = useQuery();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [meta, setMeta] = useState({
    page: query.get('page') ? parseInt(query.get('page')) : 1,
    offset: (query.get('page') ? parseInt(query.get('page')) - 1 : 0) * 20,
    limit: 20,
    count: require(`../../data/${id}.json`).filter(
      (element) =>
        element.title
          .toLowerCase()
          .includes(
            query.get('search') ? query.get('search').toLowerCase() : ''
          ) ||
        element.authors[0]
          .toLowerCase()
          .includes(
            query.get('search') ? query.get('search').toLowerCase() : ''
          ) ||
        (element.authors[1] &&
          element.authors[1]
            .toLowerCase()
            .includes(
              query.get('search') ? query.get('search').toLowerCase() : ''
            ))
    ).length,
  });
  const [books, setBooks] = useState(
    require(`../../data/${id}.json`)
      .filter(
        (element) =>
          element.title
            .toLowerCase()
            .includes(
              query.get('search') ? query.get('search').toLowerCase() : ''
            ) ||
          element.authors[0]
            .toLowerCase()
            .includes(
              query.get('search') ? query.get('search').toLowerCase() : ''
            ) ||
          (element.authors[1] &&
            element.authors[1]
              .toLowerCase()
              .includes(
                query.get('search') ? query.get('search').toLowerCase() : ''
              ))
      )
      .slice(meta.offset, meta.offset + meta.limit)
  );
  const categoryText = categories.find(
    (category) => category.id === parseInt(id)
  ).name;

  useEffect(() => {
    setMeta({
      ...meta,
      page: query.get('page') ? parseInt(query.get('page')) : 1,
      offset: (query.get('page') ? parseInt(query.get('page')) - 1 : 0) * 20,
      count: require(`../../data/${id}.json`).filter(
        (element) =>
          element.title
            .toLowerCase()
            .includes(
              query.get('search') ? query.get('search').toLowerCase() : ''
            ) ||
          element.authors[0]
            .toLowerCase()
            .includes(
              query.get('search') ? query.get('search').toLowerCase() : ''
            ) ||
          (element.authors[1] &&
            element.authors[1]
              .toLowerCase()
              .includes(
                query.get('search') ? query.get('search').toLowerCase() : ''
              ))
      ).length,
    });
    setBooks(
      require(`../../data/${id}.json`)
        .filter(
          (element) =>
            element.title
              .toLowerCase()
              .includes(
                query.get('search') ? query.get('search').toLowerCase() : ''
              ) ||
            element.authors[0]
              .toLowerCase()
              .includes(
                query.get('search') ? query.get('search').toLowerCase() : ''
              ) ||
            (element.authors[1] &&
              element.authors[1]
                .toLowerCase()
                .includes(
                  query.get('search') ? query.get('search').toLowerCase() : ''
                ))
        )
        .slice(meta.offset, meta.offset + meta.limit)
    );
  }, [id, search, meta.page]);

  const searchHandler = (e) => {
    if (!e.target.value) {
      navigate(`/category/${id}`);
    } else {
      navigate(`/category/${id}?search=${e.target.value}`);
    }
  };

  return (
    <Layout>
      <Title title={`Category: ${categoryText}`} />
      <div className={styles.wrapper}>
        <input
          type="text"
          placeholder="Search for title or author ..."
          onChange={searchHandler}
          className={styles.search}
        />
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
          {books && books.length > 0
            ? books.map((book) => <Card key={book.id} data={book} />)
            : null}
        </div>
        {books && books.length > 0 ? (
          <Pagination
            meta={meta}
            search={
              query.get('search') ? query.get('search').toLowerCase() : null
            }
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default Category;
