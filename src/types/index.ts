/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Action, AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { NotebookType, DocumentType, CellType, CellFormat, EditorType } from './app';
import { SandboxType, ParserType } from './sandbox';

export interface StateType {
  document: DocumentType;
  files: Array<NotebookType>;
  editor: EditorType;
  saved?: boolean;
  title?: string;
  sandbox?: SandboxType;
}

export type ActionType = AnyAction | Action<any> | ThunkAction<void, StateType, unknown, AnyAction>;

export type DispatchType = ThunkDispatch<StateType, unknown, AnyAction>;

export interface MiddlewareType {
  [key: string]: Function;
}

export interface ReducerType {
  [key: string]: Function;
}

export type ActionsType = Record<string, Record<string, Function>>;
export type ActionnablesType = Record<string, Function>;
export type EffectsType = Array<{ name: string; type: string; func: Function }>;

export { NotebookType, EditorType, DocumentType, CellType, CellFormat, SandboxType, ParserType };
