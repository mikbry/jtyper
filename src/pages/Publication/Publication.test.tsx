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
import Publication from './index';
import { renderWithProvider } from '../../test';
import { StateType } from '../../types';

test('Publication should render correctly', async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    publisher: { name: 'jtyper' },
    editor: { selected: 0 },
    files: [
      { id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] },
      { id: '2', title: 'notebook1', cells: [{ id: '1', raw: 'text', format: 'markdown' }] },
    ],
  };
  const history = ['/jtyper/notebook'];
  const { asFragment } = await renderWithProvider(
    <Routes>
      <Route path='/:publisherName/:notebookId' element={<Publication />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  expect(asFragment()).toMatchSnapshot();
});
