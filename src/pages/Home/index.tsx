import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

import Layout from '../../Layout';
import Title from '../../components/Title';
import Card from '../../components/Card';

// import { getCategories } from '../../services/fetcher';

import categories from '../../data/categories.json';

const SectionPerCategory = ({ data }) => {
  const { id, name } = data;

  const books = require(`../../data/${id}.json`).slice(0, 4);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h2>{name}</h2>
        <Link to={`/category/${id}`}>Lihat Semua {'>'}</Link>
      </div>
      <div className={styles.bottom}>
        {books ? books.map((book) => <Card key={book.id} data={book} />) : null}
      </div>
    </div>
  );
};

const Home = () => {
  // const [categories, setCategories] = useState([]);

  // const fetchCategories = async () => {
  //   try {
  //     const res = await getCategories();
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   // fetchCategories();
  //   console.log(categories);

  //   return;
  // }, []);

  return (
    <Layout>
      <Title />
      {categories
        ? categories.map((category) => (
            <SectionPerCategory key={category.id} data={category} />
          ))
        : null}
    </Layout>
  );
};

export default Home;
