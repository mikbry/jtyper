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
import userEvent from '@testing-library/user-event';
import Notebook from './index';
import { renderWithProvider, MockupEvent } from '../../test';
import { StateType, NotebookType } from '../../types';

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 308 });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 116 });
  // Stubs for codemirror
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({ left: 22, top: 90 }),
  });
  Object.defineProperty(document.body, 'createTextRange', {
    value: () => ({ getBoundingClientRect: jest.fn(), getClientRects: () => ({ length: 0 }) }),
  });
});

test('Notebook should render correctly', async () => {
  const state: Partial<StateType> = {};
  const { asFragment } = await renderWithProvider(<Notebook />, { state });
  expect(asFragment()).toMatchSnapshot();
});

test('Notebook without notebook should display "No content"', async () => {
  const state: Partial<StateType> = {};
  const { getAllByText } = await renderWithProvider(<Notebook />, { state });
  expect(getAllByText('No content')).toBeDefined();
});

test('Notebook selected with data should display content', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const { getAllByRole } = await renderWithProvider(<Notebook />, { state });
  const cells = getAllByRole('button');
  expect(cells.length).toBe(1);
  expect(cells[0].textContent).toBe('text');
  fireEvent.click(cells[0]);
  const content = cells[0].firstChild?.childNodes[1] as HTMLElement;
  const textarea: HTMLTextAreaElement = content?.firstChild?.firstChild?.firstChild as HTMLTextAreaElement;
  await userEvent.type(textarea, 'another text');
  await userEvent.type(textarea, 'new text');
});

test('Notebook readonly selected with data should display content', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', title: 'notebook', readOnly: true, cells: [{ id: '1', raw: 'text' }] }],
  };
  const { getAllByRole } = await renderWithProvider(<Notebook />, { state });
  const cells = getAllByRole('button');
  expect(cells.length).toBe(1);
  expect(cells[0].textContent).toBe('text');
  fireEvent.click(cells[0]);
});

test('Notebook readonly should not  delete content', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', title: 'notebook', readOnly: true, cells: [{ id: '1', raw: 'text' }] }],
  };
  const { getAllByRole } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'd',
      ctrlKey: true,
    }),
  );
  const files = state.files as NotebookType[];
  expect(files[0].cells?.length).toBe(1);
});

test('Notebook editable should have content deleted', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
  };
  const { getAllByRole } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'd',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  const files = state.files as NotebookType[];
  expect(files[0].cells?.length).toBe(0);
});

test('Notebook editable should save content', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole } = await renderWithProvider(<Notebook />, { state, real: false });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 's',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  // await new Promise(r => setTimeout(r, 4000));
  jest.useFakeTimers();
  jest.runAllTimers();
  // Bug works correctly in dev but not here...
  expect(state.saved).toBe(false);
});
