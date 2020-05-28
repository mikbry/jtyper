/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { INITIALIZE, STORAGE } from '../../constants';
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

const init = async (fxComposer?: ComposerType): Promise<[Partial<StateType>, Function]> => {
  const sandbox = await initSandbox();
  const postInit = async () => {
    if (process.env.NOTEBOOK_PATH) {
      // TODO load from server
    }
  };
  if (fxComposer) {
    // Localstorage
    const document = (await fxComposer(INITIALIZE + STORAGE, {
      name: 'document',
      defaultValue: undefined,
    })) as DocumentType;
    const files = (await fxComposer(INITIALIZE + STORAGE, {
      name: 'files',
      defaultValue: undefined,
    })) as NotebookType[];
    const editor = (await fxComposer(INITIALIZE + STORAGE, { name: 'editor', defaultValue: undefined })) as EditorType;

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
