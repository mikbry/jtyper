/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { APP, INITIALIZE, DONE } from '../../../constants';
import { StateType, NotebookType, CellFormatEnum, CellType } from '../../../types';
import { getCurrentNotebook, validateSelectedCell, getNotebookCell } from '../../selectors';

const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const handlers = {
  [INITIALIZE + DONE]: (state: StateType, action: Partial<StateType>) => {
    let { document } = action;
    if (!document) {
      ({ document } = state);
    }
    let { files } = action;
    if (!files) {
      ({ files } = state);
    }
    let { editor } = action;
    if (!editor) {
      ({ editor } = state);
    }
    return { ...state, document, files, editor, init: true, saved: true };
  },
  [APP.SETTITLE + DONE]: (state: StateType, action: { title: string }) => {
    const { title } = action;
    return { ...state, document: { ...document, title }, saved: false };
  },
  [APP.CREATENOTEBOOK + DONE]: (state: StateType, action: Partial<NotebookType>) => {
    let { title = 'Notebook', cells } = action;
    const { files, editor } = state;
    let i = 1;
    let it = (f: NotebookType) => f.title === title;
    while (files.findIndex(it) !== -1) {
      title = `Notebook${i}`;
      i += 1;
    }
    if (cells) {
      cells = cells.map(cell => ({ ...cell, id: generateId() }));
    } else {
      cells = [{ id: generateId(), raw: `# ${title}` }];
    }
    const notebook: NotebookType = {
      id: generateId(),
      title,
      cells,
      localStorage: true,
    };
    if (action.name) {
      notebook.name = action.name;
      it = (f: NotebookType) => f.name === notebook.name;
      while (files.findIndex(it) !== -1) {
        notebook.name = `Notebook${i}`;
        i += 1;
      }
    }
    editor.selected = files.length;
    files.push(notebook);
    return { ...state, files, editor, saved: false };
  },
  [APP.DELETENOTEBOOK + DONE]: (state: StateType, action: { index: number }) => {
    const { index } = action;
    const { files, editor } = state;
    files.splice(index, 1);
    editor.selectedCell = undefined;
    if (files.length === 0) {
      editor.selected = undefined;
    } else if (editor.selected && editor.selected >= files.length) {
      editor.selected = files.length - 1;
    }
    return { ...state, files, editor, saved: false };
  },
  [APP.CREATECELL + DONE]: (state: StateType, action: { raw?: string; format?: CellFormatEnum }) => {
    const { files, editor } = state;
    const notebook = getCurrentNotebook(editor, files);
    if (notebook) {
      const { raw = '', format } = action;
      editor.selectedCell = notebook.cells.length;
      const cell: CellType = { id: generateId(), raw, format };
      notebook.cells.push(cell);
      return { ...state, files, saved: false };
    }
    return state;
  },
  [APP.UPDATECELL + DONE]: (state: StateType, action: CellType) => {
    const { files, editor } = state;
    const notebook = getCurrentNotebook(editor, files);
    const cell = getNotebookCell(action.id, notebook);
    if (cell) {
      cell.raw = action.raw;
      cell.format = action.format;
      return { ...state, files, saved: false };
    }
    return state;
  },
  [APP.SELECTFILE + DONE]: (state: StateType, action: { selected: number }) => {
    const { selected } = action;
    const { editor } = state;
    return { ...state, editor: { ...editor, selected, selectedCell: undefined }, saved: false };
  },
  [APP.SELECTCELL + DONE]: (state: StateType, action: { selected: number }) => {
    const { selected } = action;
    const { files, editor } = state;

    const notebook = getCurrentNotebook(editor, files);
    const length = notebook?.cells.length || 0;
    const selectedCell = validateSelectedCell(selected, length);
    return { ...state, editor: { ...editor, selectedCell }, saved: false };
  },
  [APP.COPY + DONE]: (state: StateType, action: { selected: number; cell: CellType }) => {
    const { selected, cell } = action;
    const { files, editor } = state;
    let { selectedCell } = editor;
    const notebook = getCurrentNotebook(editor, files);
    if (notebook && selected !== undefined) {
      // Cut selected
      notebook.cells.splice(selected, 1);
      const length = notebook?.cells.length || 0;
      selectedCell = validateSelectedCell(selected, length);
    }
    const copyBuffer = { format: cell.format, raw: cell.raw };
    return { ...state, editor: { ...editor, selectedCell, copyBuffer }, files, saved: false };
  },
  [APP.PASTE + DONE]: (state: StateType) => {
    const { files, editor } = state;
    const { selectedCell = 0 } = editor;
    const notebook = getCurrentNotebook(editor, files);
    if (notebook && editor.copyBuffer) {
      const cell: CellType = { id: generateId(), raw: editor.copyBuffer.raw || '', format: editor.copyBuffer.format };
      notebook.cells.splice(selectedCell, 0, cell);
    }
    return { ...state, editor: { ...editor, selectedCell }, files, saved: false };
  },
  [APP.LOCALSAVE + DONE]: (state: StateType) => ({ ...state, saved: true }),
};

export default handlers;
