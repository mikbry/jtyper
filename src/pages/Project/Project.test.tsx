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
import Project from './index';
import { renderWithProvider } from '../../test';
import { StateType } from '../../types';

test('Project should render correctly', async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    publisher: { name: 'jtyper' },
    editor: { selected: 1 },
    files: [
      { id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] },
      { id: '2', title: 'notebook1', cells: [{ id: '1', raw: 'text', format: 'markdown' }] },
    ],
  };
  const history = ['/p/jtyper'];
  const { asFragment } = await renderWithProvider(
    <Routes>
      <Route path='/p/:publisherName' element={<Project />} />
    </Routes>,
    {
      state,
      history,
      real: true,
    },
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Project should render 404 when publisher was not found', async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    publisher: { name: 'jtyper' },
  };
  const history = ['/p/notexist'];
  const { findByText } = await renderWithProvider(
    <Routes>
      <Route path='/p/:publisherName' element={<Project />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  const text = await findByText('Publisher do not exist.');
  expect(text).toBeDefined();
});

test('Project should render 404 when notebook was not found', async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    publisher: { name: 'jtyper' },
    files: [],
  };
  const history = ['/p/jtyper'];
  const { findByText } = await renderWithProvider(
    <Routes>
      <Route path='/p/:publisherName' element={<Project />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  const text = await findByText('Notebook was not found.');
  expect(text).toBeDefined();
});

test('Project should render correctly with url /p/jtyper/notebook1', async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    publisher: { name: 'jtyper' },
    files: [{ id: '1', title: 'notebook1', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const history = ['/p/jtyper/notebook1'];
  const { findByText } = await renderWithProvider(
    <Routes>
      <Route path='/p/:publisherName/:notebookId' element={<Project />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  const text = await findByText('notebook1');
  expect(text).toBeDefined();
});

test("Project should hide Explorer's drawer", async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    editor: { hideExplorer: true },
    publisher: { name: 'jtyper' },
    files: [{ id: '1', title: 'notebook1', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const history = ['/p/jtyper/notebook1'];
  const { queryByTestId } = await renderWithProvider(
    <Routes>
      <Route path='/p/:publisherName/:notebookId' element={<Project />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  const drawer = queryByTestId('drawer');
  expect(drawer).toEqual(null);
});

test('Project should hide topBar', async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    editor: { hideTopBar: true },
    publisher: { name: 'jtyper' },
    files: [{ id: '1', title: 'notebook1', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const history = ['/p/jtyper/notebook1'];
  const { queryByTestId } = await renderWithProvider(
    <Routes>
      <Route path='/p/:publisherName/:notebookId' element={<Project />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  const topBar = queryByTestId('appbar');
  expect(topBar).toEqual(null);
});

test('Project should display Help', async () => {
  const state: Partial<StateType> = {
    document: { title: 'title' },
    editor: { displayHelp: true },
    publisher: { name: 'jtyper' },
    files: [{ id: '1', title: 'notebook1', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }],
  };
  const history = ['/p/jtyper/notebook1'];
  const { queryByTestId } = await renderWithProvider(
    <Routes>
      <Route path='/p/:publisherName/:notebookId' element={<Project />} />
    </Routes>,
    {
      state,
      history,
    },
  );
  const help = queryByTestId('modal-background') as HTMLElement;
  help.click();
  expect(help).toBeDefined();
});
