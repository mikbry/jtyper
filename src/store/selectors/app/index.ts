/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EditorType, NotebookType, CellType } from '../../../types';

export const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

export const getCurrentNotebook = (editor: EditorType, files: Array<NotebookType>): NotebookType =>
  files[editor.selected as number] as NotebookType;

export const getNotebook = (selected: number | undefined, files: Array<NotebookType>): NotebookType | undefined =>
  selected !== undefined ? files[selected] : undefined;

export const getCurrentCell = (editor: EditorType, notebook: NotebookType | undefined): CellType | undefined => {
  let cell;
  const { selectedCell } = editor;
  if (notebook !== undefined && selectedCell !== undefined) {
    cell = notebook.cells[selectedCell];
  }
  return cell;
};

export const getNotebookCell = (id: string, notebook: NotebookType): CellType | undefined =>
  notebook.cells.find(c => c.id === id);

export const findNotebookCodeCell = (notebook: NotebookType, start = 0): CellType | undefined =>
  notebook.cells.find((c, index) => c.format === 'code' && start <= index);

export const validateSelectedCell = (selected: number, length: number): number | undefined => {
  let selectedCell;
  if (selected < 0 && length) {
    selectedCell = 0;
  } else if (selected >= length && length) {
    selectedCell = length - 1;
  } else if (length) {
    selectedCell = selected;
  }
  return selectedCell;
};

export const getNotebookCellIndex = (notebook: NotebookType, id: string): number =>
  notebook.cells.findIndex(c => c.id === id) as number;

export const getFullCode = (notebook: NotebookType, id: string): string[] => {
  const index = getNotebookCellIndex(notebook, id);
  const code: string[] = [];
  notebook.cells.forEach((cell, i) => {
    if (i <= index && cell.format === 'code') {
      code.push(cell.raw);
    }
  });
  return code;
};
