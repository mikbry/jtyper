/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Store } from 'redux';
import { INITIALIZE, STORAGE, SERVER, APP, DONE, FETCH } from '../../constants';
import { DocumentType, ComposerType, StateType, NotebookType, EditorType } from '../../types';
import {
  createNotebook,
  deleteNotebook,
  createCell,
  updateCell,
  runCell,
  selectFile,
  selectCell,
  resetCell,
  resetAllCell,
  cut,
  copy,
  paste,
  save,
  toggleHelp,
  toggleView,
} from './app';
import useCommands from './commands';
import initSandbox from '../effects/sandbox';

const init = async (compose?: ComposerType): Promise<[Partial<StateType>, Function]> => {
  const sandbox = await initSandbox();
  const postInit = async (store: Store) => {
    if (process.env.NOTEBOOK_PATH && compose) {
      // load from server
      let url = process.env.PUBLIC_URL || '';
      url += process.env.CONTENT_BASE || '';
      url += `/${process.env.NOTEBOOK_PATH}/index.json`;
      const files: NotebookType[] = (await compose(INITIALIZE + SERVER, {
        url,
      })) as NotebookType[];
      store.dispatch({ type: APP.ADDFILES + DONE, files });
      const { editor, files: fs } = store.getState();
      if (editor.selected !== undefined) {
        //
        const notebook: NotebookType = fs[editor.selected] as NotebookType;
        if (notebook && notebook.url && !notebook.state) {
          compose(APP.REQUESTNOTEBOOK + FETCH, { notebook }).then(n =>
            store.dispatch({ type: APP.UPDATENOTEBOOK + DONE, ...n }),
          );
        }
      }
    }
  };
  if (compose) {
    // Localstorage
    const document = (await compose(INITIALIZE + STORAGE, {
      name: 'document',
      defaultValue: undefined,
    })) as DocumentType;
    const files = (await compose(INITIALIZE + STORAGE, {
      name: 'files',
      defaultValue: undefined,
    })) as NotebookType[];
    const editor = (await compose(INITIALIZE + STORAGE, { name: 'editor', defaultValue: undefined })) as EditorType;

    const modules = {
      '@tensorflow/tfjs': { name: '@tensorflow/tfjs', url: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.js' },
    };
    sandbox.setModules(modules);
    return [{ document, files, editor, sandbox, modules }, postInit];
  }
  return [{ sandbox }, postInit];
};

export {
  init,
  createNotebook,
  deleteNotebook,
  createCell,
  updateCell,
  runCell,
  selectFile,
  selectCell,
  resetCell,
  resetAllCell,
  cut,
  copy,
  paste,
  save,
  useCommands,
  toggleHelp,
  toggleView,
};
