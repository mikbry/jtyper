/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'react';
import { NotebookType, DocumentType, CellType, CellFormat, EditorType } from './app';

export interface StateType {
  document: DocumentType;
  files: Array<NotebookType>;
  editor: EditorType;
  saved?: boolean;
  title?: string;
}

export interface LocalContextType extends StateType {
  dispatch: Dispatch<any>;
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

export type ActionsType = Record<string, Record<string, Function>>;
export type ActionnablesType = Record<string, Function>;
export type EffectsType = Array<{ name: string; type: string; func: Function }>;

export { NotebookType, EditorType, DocumentType, CellType, CellFormat };
