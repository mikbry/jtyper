/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type CellFormat = 'markdown' | 'code' | 'raw' | undefined;

export interface CellType {
  format?: 'markdown' | 'code' | 'raw';
  id: string;
  raw: string;
  out?: string[];
}

export interface NotebookType {
  id: string;
  title?: string;
  filename?: string;
  folder?: string;
  readOnly?: boolean;
  localStorage?: boolean;
  cells: Array<CellType>;
  run?: Array<number>;
}

export interface DocumentType {
  title: string;
  author?: string;
}

export interface EditorType {
  selected?: number;
  selectedCell?: number;
  readOnly?: boolean;
  copyBuffer?: Partial<CellType>;
}
