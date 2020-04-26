/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockupProvider from '../../test/MockupProvider';
import Explorer from './index';
import { StateType } from '../../types';
// import FakeMouseEvent from '../../test/FakeMouseEvent';

test('Explorer should render correctly', () => {
  const { asFragment } = render(
    <MockupProvider>
      <Explorer />
    </MockupProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Explorer should display one notebook correctly', () => {
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: 0 },
  };
  const { getAllByTestId } = render(
    <MockupProvider initialstate={state}>
      <Explorer />
    </MockupProvider>,
  );
  const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1');
});

test('Explorer should select a notebook', () => {
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: undefined },
  };
  const { getAllByTestId } = render(
    <MockupProvider initialstate={state}>
      <Explorer />
    </MockupProvider>,
  );
  const items = getAllByTestId('item');
  fireEvent.click(items[0]);
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('Notebook1');
});

test('Explorer should create a notebook', () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [],
    editor: { selected: undefined },
  };
  const { getAllByRole, rerender } = render(
    <MockupProvider initialstate={state} dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
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

test('Explorer should duplicate a notebook', () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: 0 },
  };
  const { getAllByRole, rerender } = render(
    <MockupProvider initialstate={state} dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
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

test('Explorer should not delete a notebook', () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [], readOnly: true }],
    editor: { selected: 0 },
  };
  const { getAllByRole, rerender } = render(
    <MockupProvider initialstate={state} dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
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

test('Explorer should delete a notebook', () => {
  const dispatch = jest.fn().mockImplementation(() => {
    // console.log('dispatch', action);
  });
  const state: Partial<StateType> = {
    files: [{ id: '1', title: 'Notebook1', cells: [] }],
    editor: { selected: 0 },
  };
  const { getAllByRole, rerender } = render(
    <MockupProvider initialstate={state} dispatch={dispatch}>
      <Explorer />
    </MockupProvider>,
  );
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
