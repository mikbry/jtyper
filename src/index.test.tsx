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
import { localStorageMock } from './test';

test('App should launch correctly', async () => {
  localStorageMock.clear();
  const store = await initStore(initialState);
  const { asFragment } = render(<App store={store} />);
  expect(asFragment()).toMatchSnapshot();
});

test('store should be setup from localstorage', async () => {
  localStorageMock.fill({
    document: JSON.stringify({ title: 'Project' }),
    editor: JSON.stringify({ selected: 0 }),
    files: JSON.stringify([{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }]),
  });
  const store = await initStore(initialState);
  const state = store.getState();
  expect(state.document.title).toBe('Project');
  expect(state.editor.selected).toBe(0);
  expect(state.files.length).toBe(2);
});
