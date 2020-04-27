/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { initialState } from './store/reducers';
import App from './App';
import { initStore } from './store';

test('App should launch correctly', async () => {
  const store = await initStore(initialState);
  const { asFragment } = render(<App store={store} />);
  expect(asFragment()).toMatchSnapshot();
});
