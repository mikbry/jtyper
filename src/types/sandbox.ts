/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface ParserType {
  parse: Function;
}

export interface SandboxType {
  parser?: ParserType;
  parse: Function;
  execute: Function;
}

export interface LogEntryType {
  id: string;
  text: string;
  type: string;
}

export interface LoggerType {
  print: Function;
  out: LogEntryType[];
}

export type DataType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'array'
  | Error;

export interface VariableType {
  kind: string;
  value?: string | number | boolean | object | Function;
  type: DataType;
}

export interface FuncType {
  start: number;
  renamedTo?: string;
}

export interface ImportType {
  start: number;
  url?: string;
  specifiers: Array<{ name: string; type: string; alias?: string }>;
}

export interface CodeType {
  script: string;
  variables: Record<string, VariableType>;
  funcs: Record<string, FuncType>;
  imports: Record<string, ImportType>;
}

export interface ScopeType {
  id: string;
  variables: Record<string, VariableType>;
  print: Function;
}
