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
