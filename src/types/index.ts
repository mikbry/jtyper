/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'react';
import { NotebookType, DocumentType, CellType, CellFormatEnum, CodeEnum, EditorType } from './app';

export interface LocalContextType extends StateType {
  dispatch: Dispatch<ActionType>;
}

export interface StateType {
  document: DocumentType;
  files: Array<NotebookType>;
  editor: EditorType;
}

export interface ActionType {
  type: string;
  payload: {};
}

export interface MiddlewareType {
  [key: string]: Function;
}

export interface ReducerType {
  [key: string]: Function;
}

export { NotebookType, EditorType, DocumentType, CellType, CellFormatEnum, CodeEnum };
