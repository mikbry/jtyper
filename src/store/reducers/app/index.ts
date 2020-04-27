/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { APP, INITIALIZE, DONE } from '../../../constants';
import { StateType, NotebookType, CellFormat, CellType } from '../../../types';
import { getCurrentNotebook, getNotebook, validateSelectedCell, getNotebookCell } from '../../selectors';

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
    // TODO merge files
    let { files } = action;
    if (!files) {
      ({ files } = state);
    }
    let { editor } = action;
    if (!editor) {
      ({ editor } = state);
    }
    const notebook = getCurrentNotebook(editor, files);
    const title = notebook?.title || '';
    return { ...state, document, files, editor, init: true, saved: true, title };
  },
  [APP.CREATENOTEBOOK + DONE]: (state: StateType, action: Partial<NotebookType>) => {
    let { title = 'Notebook' } = action;
    const { files, editor } = state;
    let i = 1;
    const it = (f: NotebookType) => f.title === title;
    while (files.findIndex(it) !== -1) {
      title = `Notebook${i}`;
      i += 1;
    }
    const cells = [{ id: generateId(), raw: `# ${title}` }];
    const notebook: NotebookType = {
      id: generateId(),
      title,
      cells,
      localStorage: true,
    };
    editor.selected = files.length;
    files.push(notebook);
    return { ...state, files, editor, saved: false, title };
  },
  [APP.DELETENOTEBOOK + DONE]: (state: StateType, action: { index: number }) => {
    const { index } = action;
    const { files, editor } = state;
    files.splice(index, 1);
    editor.selectedCell = undefined;
    if (files.length === 0) {
      editor.selected = undefined;
    } else if (editor.selected !== undefined && editor.selected >= files.length) {
      editor.selected = files.length - 1;
    }
    const notebook = getNotebook(editor.selected, files);
    const title = notebook?.title || '';
    return { ...state, files, editor, saved: false, title };
  },
  [APP.CREATECELL + DONE]: (state: StateType, action: { raw?: string; format?: CellFormat }) => {
    const { files, editor } = state;
    const notebook = getCurrentNotebook(editor, files);
    const { raw = '', format } = action;
    editor.selectedCell = notebook.cells.length;
    const cell: CellType = { id: generateId(), raw, format };
    notebook.cells.push(cell);
    return { ...state, files, saved: false };
  },
  [APP.UPDATECELL + DONE]: (state: StateType, action: CellType) => {
    const { files, editor } = state;
    const notebook = getCurrentNotebook(editor, files);
    const cell = getNotebookCell(action.id, notebook) as CellType;
    cell.raw = action.raw;
    cell.format = action.format;
    return { ...state, files, saved: false };
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
    const { length } = notebook.cells;
    const selectedCell = validateSelectedCell(selected, length);
    const { title } = notebook;
    return { ...state, editor: { ...editor, selectedCell }, saved: false, title };
  },
  [APP.COPY + DONE]: (state: StateType, action: { selected: number; cell: CellType }) => {
    const { selected, cell } = action;
    const { files, editor } = state;
    let { selectedCell } = editor;
    const notebook = getCurrentNotebook(editor, files);
    if (notebook && selected !== undefined) {
      // Cut selected
      notebook.cells.splice(selected, 1);
      const { length } = notebook.cells;
      selectedCell = validateSelectedCell(selected, length);
    }
    const copyBuffer = { format: cell.format, raw: cell.raw };
    return { ...state, editor: { ...editor, selectedCell, copyBuffer }, files, saved: false };
  },
  [APP.PASTE + DONE]: (state: StateType) => {
    const { files, editor } = state;
    const copyBuffer: Partial<CellType> = editor.copyBuffer as Partial<CellType>;
    const selectedCell: number = editor.selectedCell as number;
    const notebook = getCurrentNotebook(editor, files);
    const cell: CellType = {
      id: generateId(),
      raw: copyBuffer.raw as string,
      format: copyBuffer.format,
    };
    notebook.cells.splice(selectedCell, 0, cell);
    return { ...state, editor: { ...editor, selectedCell }, files, saved: false };
  },
  [APP.LOCALSAVE + DONE]: (state: StateType) => ({ ...state, saved: true }),
};

export default handlers;
