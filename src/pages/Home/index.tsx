import React, { useEffect, useState } from 'react';

import Layout from '../../Layout';
import Title from '../../components/Title';

import { getCategories } from '../../services/fetcher';

const Home = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetch(
      'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories',
      { mode: 'no-cors' }
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
    return;
  }, []);

  return (
    <Layout>
      <Title />
      asdsad
    </Layout>
  );
};

export default Home;
