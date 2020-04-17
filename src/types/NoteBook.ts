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

export enum CellTypeEnum {
  'markdown',
  'code',
  'raw',
}

export interface CellType {
  type?: CellTypeEnum;
  id: string;
  raw: string;
}

export interface NotebookType {
  title?: string;
  name?: string;
  folder?: string;
  code?: CodeEnum;
  readOnly?: boolean;
  localStorage?: boolean;
  cells: Array<CellType>;
  run?: Array<number>;
  selectedCell?: number;
}

export interface ProjectType {
  title: string;
  files: Array<NotebookType>;
  selected?: number;
}
