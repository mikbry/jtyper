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

export const getNotebookById = (id: string, files: Array<NotebookType>): NotebookType | undefined =>
  files.find(f => f.id === id);

export const getNotebookIndexById = (id: string, files: Array<NotebookType>): number =>
  files.findIndex(f => f.id === id);

export const getCurrentNotebook = (editor: EditorType, files: Array<NotebookType>): NotebookType =>
  files[editor.selected as number] as NotebookType;

export const getNotebook = (selected: number | undefined, files: Array<NotebookType>): NotebookType | undefined =>
  selected !== undefined ? files[selected] : undefined;

export const getNotebookCellByIndex = (index: number, notebook: NotebookType): CellType | undefined =>
  notebook.cells[index];

export const getCurrentCell = (editor: EditorType, notebook: NotebookType | undefined): CellType | undefined => {
  let cell;
  const { selectedCell } = editor;
  if (notebook !== undefined && selectedCell !== undefined) {
    cell = getNotebookCellByIndex(selectedCell, notebook);
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

type CodeCells = { code: string[]; cells: CellType[] };

export const getAllCodeCells = (notebook: NotebookType): CodeCells => {
  const cells: CellType[] = [];
  const code: string[] = [];
  notebook.cells.forEach(cell => {
    if (cell.format === 'code') {
      cells.push(cell);
      code.push(cell.raw);
    }
  });
  return { cells, code };
};

export const createNewTitle = (files: Array<NotebookType>, fromTitle?: string): string => {
  let title = fromTitle || 'Notebook';
  let i = 1;
  const it = (f: NotebookType) => f.title === title;
  while (files.findIndex(it) !== -1) {
    title = `Notebook${i}`;
    i += 1;
  }
  return title;
};

const contentBase = process.env.CONTENT_BASE || '';
export const generateUrl = (publisherName: string, notebookId?: string): string => {
  if (!notebookId) {
    return `${contentBase}/p/${publisherName.toLowerCase()}`;
  }
  return `${contentBase}/p/${publisherName.toLowerCase()}/${notebookId.toLowerCase()}`;
};

export const getNextFile = (filesLength: number, index: number | undefined): number | undefined => {
  let next = index;
  if (filesLength === 0) {
    next = undefined;
  } else if (next !== undefined && next >= filesLength) {
    next = filesLength - 1;
  }
  return next;
};

export const getNotebookTitle = (editor: EditorType, files: Array<NotebookType>): string => {
  const notebook = getCurrentNotebook(editor, files);
  return notebook?.title || '';
};
