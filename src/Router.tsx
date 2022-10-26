import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import bookmarkContext from './contexts/bookmarks';

import Home from './pages/Home';
import Category from './pages/Category';
import Detail from './pages/Detail';
import Bookmark from './pages/Bookmark';

function Router() {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  return (
    <BrowserRouter>
      <bookmarkContext.Provider value={[bookmarkedBooks, setBookmarkedBooks]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </bookmarkContext.Provider>
    </BrowserRouter>
  );
}

export default Router;
