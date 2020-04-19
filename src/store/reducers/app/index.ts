/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { APP, INITIALIZE, DONE } from '../../../constants';
import { StateType, NotebookType, CellFormatEnum, CellType } from '../../../types';
import { getCurrentNotebook } from '../../selectors';

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
    return { ...state, document, files, editor, init: true };
  },
  [APP.SETTITLE + DONE]: (state: StateType, action: { title: string }) => {
    const { title } = action;
    return { ...state, document: { ...document, title } };
  },
  [APP.CREATENOTEBOOK + DONE]: (state: StateType, action: { title: string }) => {
    let { title } = action;
    const { files, editor } = state;
    if (!title) {
      title = 'Notebook';
      let i = 1;
      const it = (f: NotebookType) => f.title === title || f.name === title;
      while (files.findIndex(it) !== -1) {
        title = `Notebook${i}`;
        i += 1;
      }
    }
    const notebook: NotebookType = {
      id: generateId(),
      title,
      cells: [{ id: generateId(), raw: `# ${title}` }],
      localStorage: true,
    };
    editor.selected = files.length;
    files.push(notebook);
    return { ...state, files, editor };
  },
  [APP.CREATECELL + DONE]: (state: StateType, action: { raw?: string; format?: CellFormatEnum }) => {
    const { files, editor } = state;
    const notebook = getCurrentNotebook(editor, files);
    if (notebook) {
      const { raw = '', format } = action;
      editor.selectedCell = notebook.cells.length;
      const cell: CellType = { id: generateId(), raw, format };
      notebook.cells.push(cell);
      return { ...state, files };
    }
    return state;
  },
  [APP.SELECTFILE + DONE]: (state: StateType, action: { selected: number }) => {
    const { selected } = action;
    const { editor } = state;
    return { ...state, editor: { ...editor, selected, selectedCell: undefined } };
  },
  [APP.SELECTCELL + DONE]: (state: StateType, action: { selected: number }) => {
    const { selected } = action;
    const { files, editor } = state;
    let selectedCell;
    const notebook = getCurrentNotebook(editor, files);
    const length = notebook?.cells.length || 0;
    if (selected < 0 && length) {
      selectedCell = length - 1;
    } else if (selected >= length && length) {
      selectedCell = 0;
    } else if (length) {
      selectedCell = selected;
    }
    return { ...state, editor: { ...editor, selectedCell } };
  },
};

export default handlers;
