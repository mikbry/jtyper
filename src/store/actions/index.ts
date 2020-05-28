/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { INITIALIZE, STORAGE, SERVER } from '../../constants';
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
} from './app';
import useCommands from './commands';
import initSandbox from '../effects/sandbox';

const init = async (compose?: ComposerType): Promise<[Partial<StateType>, Function]> => {
  const sandbox = await initSandbox();
  const postInit = async () => {
    if (process.env.NOTEBOOK_PATH && compose) {
      // TODO load from server
      let url = process.env.PUBLIC_URL || '';
      url += process.env.CONTENT_BASE || '';
      url += `/${process.env.NOTEBOOK_PATH}/index.json`;
      const data = await compose(INITIALIZE + SERVER, {
        url,
      });
      console.log('loaded from server data=', data);
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
};
