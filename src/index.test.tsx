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
import { selectFile } from './store/actions';
import App from './App';
import { initStore } from './store';
import { localStorageMock } from './test';

afterEach(() => {
  delete global.fetch;
});

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

test('init with notebook folder', async () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({
    // 3
    json: () => mockJsonPromise,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  localStorageMock.fill({
    document: JSON.stringify({ title: 'Project' }),
    editor: JSON.stringify({ selected: 0 }),
    files: JSON.stringify([{ id: '1', title: 'notebook', cells: [{ id: '1', raw: 'text', format: 'markdown' }] }]),
  });
  process.env.NOTEBOOK_PATH = 'notebook';
  const store = await initStore(initialState);
  const state = store.getState();
  expect(state.document.title).toBe('Project');
  expect(state.editor.selected).toBe(0);
  expect(state.files.length).toBe(2);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/notebook/index.json');
});

test('init a notebook folder with one unselected file', async () => {
  const folder = {
    files: [
      {
        type: 'notebook',
        metadata: {
          id: 'dfggf',
          title: 'Home',
        },
        source: ['home.ipynb'],
      },
      {
        type: 'img',
      },
    ],
  };
  const folderResponse = {
    json: () => Promise.resolve(folder),
  };
  const fileResponse = {
    json: () => Promise.resolve({ cells: [] }),
  };
  global.fetch = jest.fn().mockImplementation(url => {
    let response;
    if (url === '/notebook/index.json') {
      response = folderResponse;
    } else {
      response = fileResponse;
    }
    return Promise.resolve(response) as Promise<Response>;
  });
  localStorageMock.fill({ editor: JSON.stringify({ selected: undefined }) });
  let state = { ...initialState };
  state.editor.selected = undefined;
  process.env.NOTEBOOK_PATH = 'notebook';
  const store = await initStore(state);
  state = store.getState();
  expect(state.editor.selected).toBe(undefined);
  expect(state.files.length).toBe(2);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/notebook/index.json');
});

test('init a notebook folder with one file', async () => {
  const folder = {
    files: [
      {
        type: 'notebook',
        metadata: {
          id: 'dfggf',
          title: 'Home',
        },
        source: ['home.ipynb'],
      },
      {
        type: 'img',
      },
    ],
  };
  const folderResponse = {
    json: () => Promise.resolve(folder),
  };
  const fileResponse = {
    json: () => Promise.resolve({ cells: [] }),
  };
  global.fetch = jest.fn().mockImplementation(url => {
    let response;
    if (url === '/notebook/index.json') {
      response = folderResponse;
    } else {
      response = fileResponse;
    }
    return Promise.resolve(response) as Promise<Response>;
  });
  localStorageMock.fill({ editor: JSON.stringify({ selected: 0 }) });
  process.env.NOTEBOOK_PATH = 'notebook';
  const store = await initStore(initialState);
  const state = store.getState();
  expect(state.document.title).toBe('Project');
  expect(state.editor.selected).toBe(0);
  expect(state.files.length).toBe(2);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/notebook/index.json');
});

test('init a notebook folder using one file and several cells', async () => {
  const folder = {
    files: [
      {
        type: 'notebook',
        metadata: {
          id: 'dfggf',
          title: 'Home',
        },
        source: ['home.ipynb'],
      },
      {
        type: 'notebook',
        metadata: {
          id: '3',
          title: 'Home',
        },
        source: ['home1.ipynb'],
      },
      {
        type: 'img',
      },
    ],
  };
  const folderResponse = {
    json: () => Promise.resolve(folder),
  };
  const fileResponse = {
    // eslint-disable-next-line prettier/prettier
    json: () => Promise.resolve({ cells: [{ 'cell_type': 'markdown', source: ['textA'] }] }),
  };
  const fileResponseb = {
    // eslint-disable-next-line prettier/prettier
    json: () => Promise.resolve({ cells: [{ 'cell_type': 'markdown', source: ['textB'] }] }),
  };
  // let loaded = false;
  global.fetch = jest.fn().mockImplementation(url => {
    let response;
    if (url === '/notebook/index.json') {
      response = folderResponse;
    } else if (url === '/notebook/home.ipynb') {
      response = fileResponse;
    } else {
      response = fileResponseb;
      // loaded = true;
    }
    return Promise.resolve(response) as Promise<Response>;
  });
  localStorageMock.fill({});
  let state = { ...initialState };
  state.editor.selected = undefined;
  process.env.NOTEBOOK_PATH = 'notebook';
  const store = await initStore(state);
  state = store.getState();
  const subscribe = async (max = 0) =>
    new Promise(resolve => {
      let count = 0;
      const u = store.subscribe(() => {
        count += 1;
        if (count > max) {
          u();
          resolve();
        }
      });
    });
  let step = 0;
  /* const u = */
  store.subscribe(() => {
    state = store.getState();
    if (step === 0) {
      expect(state.editor.selected).toEqual(0);
    } else if (step === 1) {
      // expect(store.getState().editor.selected).toEqual(1);
    } else if (step === 2) {
      // expect(state.editor.selected).toBe(1);
      /* let file = state.files[0];
      expect(file.state).toBe('loaded');
      expect(file.cells[0].raw).toBe('textA');
      [, file] = state.files;
      expect(file.state).toBe('loaded');
      expect(file.cells[0].raw).toBe('textB'); */
      // u();
    }
    // console.log('step=', state.editor.selected, step, state.files[1]);
    step += 1;
  });
  store.dispatch<any>(selectFile({ selected: 0 }));
  await subscribe(2);
  store.dispatch<any>(selectFile({ selected: 2 }));
});
