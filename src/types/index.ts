/* eslint-disable @typescript-eslint/ban-types */
/* eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": false }] */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import {
  PublisherType,
  NotebookType,
  DocumentType,
  CellType,
  CellFormat,
  CellState,
  EditorType,
  WebsiteType,
} from './app';
import {
  SandboxType,
  ParserType,
  LogEntryType,
  LoggerType,
  VariableType,
  CodeType,
  ScopeType,
  DataType,
} from './sandbox';

export interface ModuleType {
  name: string;
  url: string;
  data?: Blob;
  error?: string;
}

export interface PackageType {
  name: string;
  version: string;
  description: string;
  homepage: string;
  author: string;
  licence: string;
}

export interface StateType {
  publisher: PublisherType;
  website: WebsiteType;
  document: DocumentType;
  files: Array<NotebookType>;
  editor: EditorType;
  saved?: boolean;
  title?: string;
  sandbox?: SandboxType;
  package?: PackageType;
  modules: Record<string, ModuleType>;
}

export type ActionType = AnyAction | ThunkAction<void, StateType, unknown, AnyAction>;

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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RestType = any[];

export type ComposerParameters = any;

export type ComposerPromise = Promise<DocumentType | NotebookType[] | EditorType>;

export type ComposerType = (type: string, parameters: ComposerParameters) => ComposerPromise;

export {
  PublisherType,
  NotebookType,
  EditorType,
  DocumentType,
  CellType,
  CellFormat,
  CellState,
  SandboxType,
  ParserType,
  LogEntryType,
  LoggerType,
  VariableType,
  CodeType,
  ScopeType,
  DataType,
};
