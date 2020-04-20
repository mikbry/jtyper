/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EditorType, NotebookType, CellType } from '../../../types';

export const getCurrentNotebook = (editor: EditorType, files: Array<NotebookType>): NotebookType | undefined => {
  let notebook;
  if (editor.selected !== undefined) {
    notebook = files[editor.selected];
  }
  return notebook;
};

export const getNotebookCell = (id: string, notebook: NotebookType | undefined): CellType | undefined => {
  let cell;
  if (notebook !== undefined) {
    cell = notebook.cells.find(c => c.id === id);
  }
  return cell;
};

export const validateSelectedCell = (selected: number, length: number): number | undefined => {
  let selectedCell;
  if (selected < 0 && length) {
    selectedCell = length - 1;
  } else if (selected >= length && length) {
    selectedCell = 0;
  } else if (length) {
    selectedCell = selected;
  }
  return selectedCell;
};
