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
import { StateType, NotebookType, CellType, LogEntryType } from '../../types';

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
    editor: { selected: 0, selectedCell: 0, mode: 'edit' },
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

test('Notebook edited should have content deleted', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0, mode: 'edit' },
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
  let state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state, real: true });
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
  state = store.getState();
  expect(state.saved).toBe(true);
});

test('Notebook editable should create content', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'a',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  const files = state.files as NotebookType[];
  expect(files[0].cells?.length).toBe(2);
});

test('Notebook editable should select Cell with arrow up', async () => {
  const initialState: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state: initialState, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'ArrowUp',
      metaKey: false,
      ctrlKey: false,
      altKey: false,
    }),
  );
  let state = store.getState();
  expect(state.editor?.selectedCell).toBe(0);
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'ArrowUp',
      metaKey: false,
      ctrlKey: false,
      altKey: false,
    }),
  );
  state = store.getState();
  expect(state.editor?.selectedCell).toBe(0);
});

test('Notebook editable should select Cell with arrow down', async () => {
  const initialState: Partial<StateType> = {
    editor: { selected: 0 },
    files: [
      {
        id: '1',
        title: 'notebook',
        cells: [
          { id: '1', raw: 'text' },
          { id: '2', raw: 'text' },
        ],
      },
    ],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state: initialState, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'ArrowDown',
      metaKey: false,
      ctrlKey: false,
      altKey: false,
    }),
  );
  let state = store.getState();
  expect(state.editor?.selectedCell).toBe(0);
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'ArrowDown',
      metaKey: false,
      ctrlKey: false,
      altKey: false,
    }),
  );
  state = store.getState();
  expect(state.editor?.selectedCell).toBe(1);
});

test('Notebook editable should cut/paste content', async () => {
  let state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'x',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  state = store.getState();
  let copyBuffer = state.editor?.copyBuffer as Partial<CellType>;
  expect(copyBuffer.raw).toBe('text');
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'v',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  state = store.getState();
  const files = state.files as NotebookType[];
  expect(files[0].cells?.length).toBe(1);
  expect(state.editor?.selectedCell).toBe(undefined);
  copyBuffer = state.editor?.copyBuffer as Partial<CellType>;
  expect(copyBuffer.raw).toBe('text');
});

test('Notebook editable should copy/paste content', async () => {
  let state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'c',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  state = store.getState();
  let copyBuffer = state.editor?.copyBuffer as Partial<CellType>;
  expect(copyBuffer.raw).toBe('text');
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'v',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  state = store.getState();
  const files = state.files as NotebookType[];
  expect(files[0].cells?.length).toBe(2);
  expect(state.editor?.selectedCell).toBe(0);
  copyBuffer = state.editor?.copyBuffer as Partial<CellType>;
  expect(copyBuffer.raw).toBe('text');
});

test('Notebook editable should escape', async () => {
  let state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0, mode: 'edit' },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'Escape',
      metaKey: false,
      ctrlKey: false,
      altKey: false,
    }),
  );
  state = store.getState();
  expect(state.editor?.selectedCell).toBe(undefined);
});

test('Notebook editable should enter', async () => {
  let state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: undefined },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text' }] }],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'Enter',
      metaKey: false,
      ctrlKey: false,
      altKey: false,
    }),
  );
  state = store.getState();
  expect(state.editor?.selectedCell).toBe(0);
});

test('Notebook editable should run once', async done => {
  let state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'print("hello");', format: 'code' }] }],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'Enter',
      metaKey: true,
      ctrlKey: true,
      altKey: false,
    }),
  );
  const unsub = store.subscribe(() => {
    state = store.getState();
    const files = state.files as NotebookType[];
    const cs = files[0].cells as CellType[];
    const out = cs[0].out as LogEntryType[];
    expect(out.length).toBe(1);
    expect(out[0].text).toBe('hello');
    unsub();
    done();
  });
});

test('Notebook editable should run all', async done => {
  Object.defineProperty(window.navigator, 'platform', { value: 'Mac-Os' });
  let state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [
      {
        id: '1',
        title: 'notebook',
        cells: [
          { id: '1', raw: `const val = 'hello';`, format: 'code' },
          { id: '2', raw: `print(val);\nprint("world");`, format: 'code' },
        ],
      },
    ],
    saved: false,
  };
  const { getAllByRole, store } = await renderWithProvider(<Notebook />, { state, real: true });
  const cells = getAllByRole('button');
  const notebook = cells[0].parentNode as Node;
  expect(notebook).toBeDefined();
  expect(store).toBeDefined();
  fireEvent(
    notebook,
    new MockupEvent('keydown', {
      bubbles: true,
      key: 'Enter',
      metaKey: false,
      ctrlKey: false,
      altKey: true,
    }),
  );
  const unsub = store.subscribe(() => {
    state = store.getState();
    const files = state.files as NotebookType[];
    const cs = files[0].cells as CellType[];
    const out = cs[1].out as LogEntryType[];
    expect(out.length).toBe(2);
    expect(out[0].text).toBe('hello');
    expect(out[1].text).toBe('world');
    unsub();
    done();
  });
});
