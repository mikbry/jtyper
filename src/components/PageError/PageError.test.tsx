/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { renderWithProvider } from '../../test';
import PageError from './index';

test('PageError should render correctly', async () => {
  const state = {};
  const history = ['/jtyper/error'];
  const { asFragment } = await renderWithProvider(
    <Routes>
      <Route path='/:publisherName/:notebookId' element={<PageError code={404} description='error' />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  expect(asFragment()).toMatchSnapshot();
});
