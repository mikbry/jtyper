/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, DONE, FETCH } from '../../../constants';
import { StateType, DispatchType, CellType, CellFormat, NotebookType, LogEntryType } from '../../../types';
import {
  getNotebook,
  getCurrentNotebook,
  getCurrentCell,
  findNotebookCodeCell,
  getNotebookCellIndex,
  getAllCodeCells,
  getFullCode,
  getNextCodeCell,
  getNotebookCellByIndex,
} from '../../selectors';
import { composer } from '../../effects';

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

const toggleHelp = (action: { enable: boolean }) => (dispatch: DispatchType) =>
  dispatch({ ...action, type: APP.TOGGLEHELP });

const toggleView = (action: { explorer?: { enable: boolean }; topBar?: { enable: boolean } }) => (
  dispatch: DispatchType,
) => {
  dispatch({ ...action, type: APP.TOGGLEVIEW });
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

const selectFile = (action: { selected: number }) => (dispatch: DispatchType, getState: Function) => {
  const { selected } = action;
  const { files } = getState();
  const notebook = files[selected];
  if (notebook && notebook.url && !notebook.state) {
    // Load notebook
    composer(APP.REQUESTNOTEBOOK + FETCH, { notebook }).then(n => dispatch({ type: APP.UPDATENOTEBOOK + DONE, ...n }));
  }
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
  } else {
    let cell = c;
    let si = s;
    if (s !== undefined) {
      cell = getNotebookCellByIndex(s, notebook);
      if (!cell || cell.format !== 'code') {
        si = getNextCodeCell(notebook as NotebookType, s);
        if (si) {
          cell = getNotebookCellByIndex(si, notebook);
        }
      }
    } else {
      cell = findNotebookCodeCell(notebook) as CellType;
      if (cell) {
        si = getNotebookCellIndex(notebook, cell.id);
      }
    }
    if (cell) {
      dispatch({ ...cell, type: APP.UPDATECELL + FETCH });
      const code = getFullCode(notebook, cell.id);
      const [out] = await sandbox.execute(code);
      let state = 'ran';
      out.forEach((o: LogEntryType) => {
        if (o.type === 'error') {
          state = 'error';
        }
      });
      dispatch({ ...cell, out, state, type: APP.UPDATECELL + DONE });
      let selected = next;
      // console.log('run=', si, selected, editor.selectedCell);
      // if (selected === undefined) {
      if (si !== editor.selectedCell) {
        selected = si;
        // console.log('selected=', si);
      } else {
        selected = getNextCodeCell(notebook as NotebookType, si);
        // console.log('next=', selected);
        if (selected === undefined) {
          selected = editor.selectedCell;
        }
      }
      dispatch({ type: APP.SELECTCELL + DONE, selected });
      dispatch(save({ files: true, editor: true }));
      // }
    }
  }
};

const resetCell = ({ cell }: { cell: CellType }) => (dispatch: DispatchType) => {
  dispatch({ ...cell, out: undefined, state: undefined, type: APP.UPDATECELL + DONE });
  dispatch(save({ files: true }));
};

const resetAllCell = () => (dispatch: DispatchType, getState: Function) => {
  const { editor, files } = getState();
  const notebook = getCurrentNotebook(editor, files);
  const cells = notebook.cells.map(c => ({ ...c, out: undefined }));
  dispatch({ ...notebook, cells, type: APP.UPDATENOTEBOOK + DONE });
  dispatch({ type: APP.SELECTCELL + DONE, selected: undefined, mode: undefined });
  dispatch(save({ files: true }));
};

const selectCell = (action: { selected: number | undefined; mode: 'edit' | undefined }) => (dispatch: DispatchType) => {
  const { selected, mode } = action;
  dispatch({ type: APP.SELECTCELL + DONE, selected, mode });
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
  toggleHelp,
  toggleView,
};
