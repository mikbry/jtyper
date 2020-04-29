/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, DONE, FETCH } from '../../../constants';
import { StateType, DispatchType, CellType, CellFormat, NotebookType, ComposerType } from '../../../types';
import { getCurrentNotebook, findNotebookCodeCell, getNotebookCellIndex, getFullCode } from '../../selectors';
import { composer } from '../../effects';
import initSandbox from '../../effects/sandbox';

const init = (fxComposer?: ComposerType) => async () => {
  if (fxComposer) {
    const document = await fxComposer(INITIALIZE, { name: 'document', defaultValue: undefined });
    const files = await fxComposer(INITIALIZE, { name: 'files', defaultValue: undefined });
    const editor = await fxComposer(INITIALIZE, { name: 'editor', defaultValue: undefined });
    const sandbox = await initSandbox();
    return { type: INITIALIZE + DONE, document, files, editor, sandbox };
  }
  return { type: INITIALIZE + DONE };
};

const save = (action: { document?: boolean; files?: boolean; editor?: boolean } | undefined = {}) => (
  dispatch: DispatchType,
  prevState: Function,
) => {
  const { document, files, editor } = prevState();
  let data: Partial<StateType>;
  // Not used
  /* if (action.document) {
    data = { document };
  } else if (action.files) {
    data = { files };
  } else */
  if (action && action.editor) {
    data = { editor };
  } else {
    data = { document, files, editor };
  }
  composer(APP.LOCALSAVE + FETCH, data).then(() => dispatch({ type: APP.LOCALSAVE + DONE }));
};

const createNotebook = (action: Partial<NotebookType> | undefined = {}) => (dispatch: DispatchType) => {
  dispatch({ ...action, type: APP.CREATENOTEBOOK + DONE });
  dispatch(save({ editor: true }));
};

const deleteNotebook = (action: { index: number }) => (dispatch: DispatchType) => {
  const { index } = action;
  dispatch({ type: APP.DELETENOTEBOOK + DONE, index });
  dispatch(save({ editor: true }));
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

type RunCellType = { cell: CellType; next?: number };
const runCell = ({ cell: c, next }: RunCellType) => async (dispatch: DispatchType, getState: Function) => {
  const { editor, files, sandbox } = getState();
  const notebook = getCurrentNotebook(editor, files);
  let cell = c;
  if (!cell) {
    cell = findNotebookCodeCell(notebook) as CellType;
  }
  if (cell && cell.format === 'code') {
    const code = getFullCode(notebook, cell.id);
    const out = await sandbox.execute(code);
    dispatch({ ...cell, out, type: APP.UPDATECELL + DONE });
  }
  let selected = next;
  if (cell && selected === undefined) {
    selected = getNotebookCellIndex(notebook, cell.id) + 1;
  }
  dispatch({ type: APP.SELECTCELL + DONE, selected });
  dispatch(save({ files: true, editor: true }));
};

const selectCell = (action: { selected: number }) => (dispatch: DispatchType) => {
  const { selected } = action;
  dispatch({ type: APP.SELECTCELL + DONE, selected });
  dispatch(save({ editor: true }));
};

const cut = (action: { cell: CellType; selected: number }) => (dispatch: DispatchType) => {
  const { selected, cell } = action;
  dispatch({ type: APP.COPY + DONE, selected, cell });
  dispatch(save({ editor: true }));
};

const copy = (action: { cell: CellType }) => (dispatch: DispatchType) => {
  const { cell } = action;
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
  selectFile,
  cut,
  copy,
  paste,
  save,
};
