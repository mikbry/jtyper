/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { MockupProvider, renderWithProvider } from '../../test';
import Explorer from './index';
import { StateType } from '../../types';
// import FakeMouseEvent from '../../test/FakeMouseEvent';

test('Explorer should render correctly', async () => {
  const { asFragment } = await renderWithProvider(<Explorer />, {});
  expect(asFragment()).toMatchSnapshot();
});

test('Explorer should display one notebook correctly', async () => {
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: 0 },
  };
  const { getAllByTestId } = await renderWithProvider(<Explorer />, { state });
  const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1');
});

test('Explorer should select a notebook', async () => {
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: undefined },
  };
  const { getAllByTestId } = await renderWithProvider(<Explorer />, { state, real: true });
  const items = getAllByTestId('item');
  fireEvent.click(items[0]);
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1');
});

test('Explorer should create a notebook', async () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [],
    editor: { selected: undefined },
  };
  const { getAllByRole, rerender } = await renderWithProvider(<Explorer />, { state, real: true });
  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(3);
  fireEvent.click(buttons[0]);
  rerender(
    <MockupProvider dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
  /* const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1'); */
});

test('Explorer should duplicate a notebook', async () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: 0 },
  };
  const { getAllByRole, rerender } = await renderWithProvider(<Explorer />, { state, real: true });
  const buttons = getAllByRole('button');
  fireEvent.click(buttons[1]);
  rerender(
    <MockupProvider dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
  /* const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1'); */
});

test('Explorer should not delete a notebook', async () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: 0 },
  };
  const { getAllByRole, rerender } = await renderWithProvider(<Explorer />, { state, real: true });
  const buttons = getAllByRole('button');
  fireEvent.click(buttons[2]);
  rerender(
    <MockupProvider dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
  /* const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1'); */
});

test('Explorer should delete a notebook', async () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [] }],
    editor: { selected: 0 },
  };
  const { getAllByRole, rerender } = await renderWithProvider(<Explorer />, { state, real: true });
  const buttons = getAllByRole('button');
  fireEvent.click(buttons[2]);
  rerender(
    <MockupProvider dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
  /* const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1'); */
});

test('Explorer should delete a notebook and select another one', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [
      { id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] },
      { id: '2', title: 'notebook2', cells: [{ id: '2', raw: 'text', format: 'markdown' }] },
    ],
  };
  const { getAllByRole, store } = await renderWithProvider(<Explorer />, { state, real: true });
  const items = getAllByRole('button');
  fireEvent.click(items[2]);
  const newState = store.getState();
  expect(newState.files.length).toBe(1);
  expect(newState.editor.selected).toBe(0);
});

test('Explorer should delete the last notebook and select sub one', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 2 },
    files: [
      { id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] },
      { id: '2', title: 'notebook2', cells: [{ id: '2', raw: 'text', format: 'markdown' }] },
      { id: '3', title: 'notebook3', cells: [{ id: '3', raw: 'text', format: 'markdown' }] },
    ],
  };
  const { getAllByRole, store } = await renderWithProvider(<Explorer />, { state, real: true });
  const items = getAllByRole('button');
  fireEvent.click(items[2]);
  const newState = store.getState();
  expect(newState.files.length).toBe(2);
  expect(newState.editor.selected).toBe(1);
});
