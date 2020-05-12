/* eslint-disable jsx-a11y/accessible-emoji */
/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Home from './pages/Home';
import Project from './pages/Project';
import Publication from './pages/Publication';

type Props = {
  store: Store;
};

const App: FunctionComponent<Props> = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/p' element={<Project />} />
        <Route path='/p/:publisherName' element={<Project />} />
        <Route path='/p/:publisherName/:notebookId' element={<Project />} />
        <Route path='/:publisherName/:notebookId' element={<Publication />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
