/* eslint-disable jsx-a11y/accessible-emoji */
/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Home from './pages/Home';
import Project from './pages/Project';

type Props = {
  store: Store;
};

const App: FunctionComponent<Props> = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/p/:projectName' element={<Project />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
