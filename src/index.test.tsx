/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { initState } from './store';

test('App should launch correctly', async () => {
  await initState();
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
