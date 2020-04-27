/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initialState } from './store/reducers';
import { initStore } from './store';

(async () => {
  const store = await initStore(initialState);
  ReactDOM.render(React.createElement(App, { store }), document.getElementById('root'));
})().then();
