/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, DONE, FETCH } from '../../../constants';
import { StateType, DispatchType, CellType, CellFormat, NotebookType, ComposerType } from '../../../types';
import {
  getNotebook,
  getCurrentNotebook,
  getCurrentCell,
  findNotebookCodeCell,
  getNotebookCellIndex,
  getAllCodeCells,
  getFullCode,
  getNotebookCellByIndex,
} from '../../selectors';
import { composer } from '../../effects';
import initSandbox from '../../effects/sandbox';

const init = (fxComposer?: ComposerType) => async () => {
  if (fxComposer) {
    const document = await fxComposer(INITIALIZE, { name: 'document', defaultValue: undefined });
    const files = await fxComposer(INITIALIZE, { name: 'files', defaultValue: undefined });
    const editor = await fxComposer(INITIALIZE, { name: 'editor', defaultValue: undefined });
    const sandbox = await initSandbox();
    const modules = {
      '@tensorflow/tfjs': { name: '@tensorflow/tfjs', url: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.js' },
    };
    sandbox.setModules(modules);
    return { type: INITIALIZE + DONE, document, files, editor, sandbox, modules };
  }
  return { type: INITIALIZE + DONE };
};

const save = (action: { document?: boolean; files?: boolean; editor?: boolean } | undefined = {}) => (
  dispatch: DispatchType,
  prevState: Function,
) => {
  const { document, files: _files, editor } = prevState();
  const files = _files.filter((file: NotebookType) => !file.readOnly);
  let data: Partial<StateType>;
  // Not used
  /* if (action.document) {
    data = { document };
  } else */
  if (action.files) {
    data = { files };
  } else if (action && action.editor) {
    data = { editor };
  } else {
    data = { document, files, editor };
  }
  composer(APP.LOCALSAVE + FETCH, data).then(() => dispatch({ type: APP.LOCALSAVE + DONE }));
};

const createNotebook = (action: Partial<NotebookType>) => (dispatch: DispatchType) => {
  dispatch({ ...action, type: APP.CREATENOTEBOOK + DONE });
  dispatch(save({ editor: true, files: true }));
};

const deleteNotebook = (action: { index: number }) => (dispatch: DispatchType) => {
  const { index } = action;
  dispatch({ type: APP.DELETENOTEBOOK + DONE, index });
  dispatch(save({ editor: true, files: true }));
};

const selectFile = (action: { selected: number }) => (dispatch: DispatchType) => {
  const { selected } = action;
  dispatch({ type: APP.SELECTFILE + DONE, selected });
  dispatch(save({ editor: true }));
};

const createCell = (action: { raw?: string; format?: CellFormat } | undefined = {}) => (dispatch: DispatchType) => {
  dispatch({ type: APP.CREATECELL + DONE, ...action });
  dispatch(save({ editor: true }));
};

const updateCell = (action: CellType) => (dispatch: DispatchType) => {
  dispatch({ ...action, type: APP.UPDATECELL + DONE });
  dispatch(save({ editor: true }));
};

type RunCellType = { cell?: CellType; selected?: number; next?: number; all?: boolean };
const runCell = ({ cell: c, selected: s, next, all }: RunCellType) => async (
  dispatch: DispatchType,
  getState: Function,
) => {
  const { editor, files, sandbox } = getState();
  const notebook = getCurrentNotebook(editor, files);
  let cell = c;
  if (!cell) {
    if (s) {
      cell = getNotebookCellByIndex(s, notebook);
    } else {
      cell = findNotebookCodeCell(notebook) as CellType;
    }
  }
  if (all) {
    const { cells, code } = getAllCodeCells(notebook);
    if (cells.length === 0) {
      return;
    }
    const out = await sandbox.execute(code, all);
    const ncells = notebook.cells.map(cl => {
      const i = cells.findIndex(cc => cc.id === cl.id);
      return i === -1 ? cl : { ...cl, out: out[i] };
    });
    dispatch({ ...notebook, cells: ncells, type: APP.UPDATENOTEBOOK + DONE });
  } else if (cell && cell.format === 'code') {
    const code = getFullCode(notebook, cell.id);
    const [out] = await sandbox.execute(code);
    dispatch({ ...cell, out, type: APP.UPDATECELL + DONE });
  }
  let selected = next;
  if (cell && selected === undefined && !all) {
    selected = getNotebookCellIndex(notebook, cell.id) + 1;
  }
  dispatch({ type: APP.SELECTCELL + DONE, selected });
  dispatch(save({ files: true, editor: true }));
};

const resetCell = ({ cell }: { cell: CellType }) => (dispatch: DispatchType) => {
  dispatch({ ...cell, out: undefined, type: APP.UPDATECELL + DONE });
  dispatch(save({ files: true }));
};

const resetAllCell = () => (dispatch: DispatchType, getState: Function) => {
  const { editor, files } = getState();
  const notebook = getCurrentNotebook(editor, files);
  const cells = notebook.cells.map(c => ({ ...c, out: undefined }));
  dispatch({ ...notebook, cells, type: APP.UPDATENOTEBOOK + DONE });
  dispatch(save({ files: true }));
};

const selectCell = (action: { selected: number | undefined }) => (dispatch: DispatchType) => {
  const { selected } = action;
  dispatch({ type: APP.SELECTCELL + DONE, selected });
  dispatch(save({ editor: true }));
};

const deleteCell = (action: { selected: number }) => (dispatch: DispatchType) => {
  const { selected } = action;
  dispatch({ type: APP.DELETECELL + DONE, selected });
  dispatch(save({ editor: true }));
};

const cut = (action: { cell?: CellType; selected: number }) => (dispatch: DispatchType, getState: Function) => {
  let { cell } = action;
  const { selected } = action;
  if (!cell) {
    const { editor, files } = getState();
    const notebook = getNotebook(selected, files);
    cell = getCurrentCell(editor, notebook);
  }
  dispatch({ type: APP.COPY + DONE, selected, cell });
  dispatch(save({ editor: true }));
};

const copy = (action: { cell?: CellType }) => (dispatch: DispatchType, getState: Function) => {
  let { cell } = action;
  if (!cell) {
    const { editor, files } = getState();
    const notebook = getNotebook(editor.selected, files);
    cell = getCurrentCell(editor, notebook);
  }
  dispatch({ type: APP.COPY + DONE, cell });
  dispatch(save({ editor: true }));
};

const paste = () => (dispatch: DispatchType) => {
  dispatch({ type: APP.PASTE + DONE });
  dispatch(save({ editor: true }));
};

export {
  init,
  createNotebook,
  deleteNotebook,
  createCell,
  selectCell,
  updateCell,
  runCell,
  resetCell,
  resetAllCell,
  selectFile,
  deleteCell,
  cut,
  copy,
  paste,
  save,
};
