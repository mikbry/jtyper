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
import Toolbar from './index';
import { renderWithProvider } from '../../test';
import { StateType } from '../../types';
import { BasicTheme } from '../../themes';
import initSandbox from '../../store/effects/sandbox';

test('Toolbar should render correctly', async () => {
  const state: Partial<StateType> = {};
  const { asFragment } = await renderWithProvider(<Toolbar />, { state });
  expect(asFragment()).toMatchSnapshot();
});

test('Toolbar without notebook should have all items disabled', async () => {
  const sandbox = await initSandbox();
  const state: Partial<StateType> = { sandbox };
  const { getAllByRole } = await renderWithProvider(<Toolbar />, { state });
  const items = getAllByRole('button');
  expect(items.length).toBe(12);
  // all disabled
  expect(items[0]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[1]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[2]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[3]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[4]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[5]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[6]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[7]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[8]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[9]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[10]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[11]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[11].innerText).toBe(undefined);

  // Just a brute test for code coverage
  items.forEach(item => {
    fireEvent.click(item);
  });
});

test('Toolbar with notebook should have only paste disabled', async () => {
  const sandbox = await initSandbox();
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
    sandbox,
  };
  const { getAllByRole } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByRole('button');
  expect(items.length).toBe(12);
  expect(items[0]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[1]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[2]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[3]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[4]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[5]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[6]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[7]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[8]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[9]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[10]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[11]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[11].innerText).toBe(undefined);

  // Just a brute test for code coverage
  items.forEach(item => {
    fireEvent.click(item);
  });
});

test('Toolbar with notebook and no selectedCell should have edit & format disabled', async () => {
  const sandbox = await initSandbox();
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
    sandbox,
  };
  const { getAllByRole } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByRole('button');
  expect(items.length).toBe(12);
  expect(items[0]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[1]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[2]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[3]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[4]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[5]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[6]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[7]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[8]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[9]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[10]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[11]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[11].innerText).toBe(undefined);

  // Just a brute test for code coverage
  items.forEach(item => {
    fireEvent.click(item);
  });
});

test('Toolbar with notebook and no selectedCell should use up', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const { getAllByRole, store } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByRole('button');
  fireEvent.click(items[5]);
  const newState = store.getState();
  expect(newState.editor.selectedCell).toBe(0);
});

test('Toolbar with notebook and no selectedCell should use down', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const { getAllByRole, store } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByRole('button');
  fireEvent.click(items[6]);
  const newState = store.getState();
  expect(newState.editor.selectedCell).toBe(0);
});

test('Toolbar with notebook and paste should have all enabled', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0, copyBuffer: { raw: 'text' } },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const { getAllByRole } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByRole('button');
  expect(items.length).toBe(12);
  expect(items[0]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[1]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[2]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[3]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[4]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[5]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[6]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[7]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[8]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[9]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[10]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[11]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[11].innerText).toBe(undefined);

  // Just a brute test for code coverage
  items.forEach(item => {
    fireEvent.click(item);
  });
});

test('Toolbar with readOnly notebook should have only running buttons enabled', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0 },
    files: [{ id: '1', readOnly: true, title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const { getAllByRole } = await renderWithProvider(<Toolbar />, { state });
  const items = getAllByRole('button');
  expect(items.length).toBe(12);
  // all disabled
  expect(items[0]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[1]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[2]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[3]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[4]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[5]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[6]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[7]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[8]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[9]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[10]).toHaveStyleRule('color', BasicTheme.palette.surface);
  expect(items[11]).toHaveStyleRule('color', BasicTheme.palette.disabled);
  expect(items[11].innerText).toBe(undefined);
});

test('Toolbar with notebook and selected cell should change format', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0, copyBuffer: {} },
    files: [{ id: '1', readOnly: true, title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const { getAllByTestId } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByTestId('item');
  expect(items.length).toBe(3);
  expect(items[0]).toHaveStyleRule('color', BasicTheme.palette.selected);
  fireEvent.click(items[1]);
});

test('Toolbar with notebook and selected cell should cut', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, selectedCell: 0, copyBuffer: {} },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const { getAllByRole, store } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByRole('button');
  fireEvent.click(items[2]);
  const newState = store.getState();
  expect(newState.editor.selectedCell).toBe(undefined);
  expect(newState.files[0].cells.length).toBe(0);
});

test('Toolbar with notebook and no selected cell should run', async () => {
  const state: Partial<StateType> = {
    editor: { selected: 0, copyBuffer: {} },
    files: [{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'print(0);', format: 'code' }] }],
  };
  const { getAllByRole, store } = await renderWithProvider(<Toolbar />, { state, real: true });
  const items = getAllByRole('button');
  fireEvent.click(items[7]);
  const newState = store.getState();
  expect(newState.editor.selectedCell).toBe(undefined);
});
