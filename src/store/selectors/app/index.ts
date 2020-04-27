/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EditorType, NotebookType, CellType } from '../../../types';

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
