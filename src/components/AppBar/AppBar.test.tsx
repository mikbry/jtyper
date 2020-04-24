/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AppBar from './AppBar';

test('AppBar should render correctly', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const { asFragment } = render(
    <Provider store={mockStore()}>
      <AppBar>Content</AppBar>
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
