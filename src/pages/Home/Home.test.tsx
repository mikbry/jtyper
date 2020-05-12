/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Home from './index';
import { renderWithProvider } from '../../test';
import { StateType } from '../../types';

test('Home should render correctly', async () => {
  const state: Partial<StateType> = { document: { title: 'title' } };
  const { asFragment } = await renderWithProvider(<Home />, { state });
  expect(asFragment()).toMatchSnapshot();
});
