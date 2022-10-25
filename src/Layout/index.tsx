import React from 'react';

import './Layout.module.scss';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>
        <section>{children}</section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
