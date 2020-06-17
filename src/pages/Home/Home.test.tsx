/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import Home from './index';
import { renderWithProvider } from '../../test';
import { StateType } from '../../types';

test('Home should render correctly', async () => {
  const state: Partial<StateType> = { document: { title: 'title' } };
  const { asFragment } = await renderWithProvider(<Home />, { state });
  expect(asFragment()).toMatchSnapshot();
});

test('Home button "Create a notebook" click should create a new one', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', title: 'notebook', cells: [] }],
  };
  const { getByRole, store } = await renderWithProvider(<Home />, { state, real: true });
  const button = getByRole('button');
  fireEvent.click(button);
  const newState = store.getState();
  expect(newState.files.length).toBe(2);
});

test('Home should handle redirection', async () => {
  const state: Partial<StateType> = {
    editor: { selected: undefined },
    files: [{ id: '1', title: 'notebook', cells: [] }],
  };

  const history = ['/?p=p-jtyper-notebook'];
  const notebook = <div data-testid='test-notebook'>Notebook</div>;
  const { getByTestId } = await renderWithProvider(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/p/jtyper/notebook' element={notebook} />
    </Routes>,
    {
      state,
      real: true,
      history,
    },
  );
  const el = getByTestId('test-notebook');
  expect(el).toBeDefined();
});

test('Home with wrong search params should not handle redirection', async () => {
  const state: Partial<StateType> = {
    editor: { selected: undefined },
    files: [{ id: '1', title: 'notebook', cells: [] }],
  };

  const history = ['/?e=p-jtyper-notebook'];
  const notebook = <div data-testid='test-notebook'>Notebook</div>;
  const { findByTestId } = await renderWithProvider(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/p/jtyper/notebook' element={notebook} />
    </Routes>,
    {
      state,
      real: true,
      history,
    },
  );
  const el = findByTestId('test-notebook');
  expect(el).toBeDefined();
});
