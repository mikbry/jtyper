/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum CodeEnum {
  'typescript',
}

export enum CellFormatEnum {
  'markdown',
  'code',
  'raw',
}

export interface CellType {
  format?: CellFormatEnum;
  id: string;
  raw: string;
}

export interface NotebookType {
  id: string;
  title?: string;
  name?: string;
  folder?: string;
  code?: CodeEnum;
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
}
