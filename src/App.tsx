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

console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL);
console.log('process.env.CONTENT_BASE', process.env.CONTENT_BASE);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const contentBase = process.env.CONTENT_BASE || '';

const App: FunctionComponent<Props> = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path={`${contentBase}/`} element={<Home />} />
        <Route path={`${contentBase}/p`} element={<Project />} />
        <Route path={`${contentBase}/p/:publisherName`} element={<Project />} />
        <Route path={`${contentBase}/p/:publisherName/:notebookId`} element={<Project />} />
        <Route path={`${contentBase}/:publisherName/:notebookId`} element={<Publication />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
