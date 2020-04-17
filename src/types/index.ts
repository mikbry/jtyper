/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SetStateAction, Dispatch } from 'react';
import { NotebookType, ProjectType, CellType, CellTypeEnum, CodeEnum } from './NoteBook';

export interface ContextType extends StateType {
  dispatch: Dispatch<SetStateAction<ContextType>>; // (action: ActionType) => void;
}

export interface StateType {
  // TODO
  project: ProjectType;
}

export interface ActionType {
  // TODO
  type: string;
  payload: {};
}

export interface MiddlewareType {
  [key: string]: Function;
}

export interface ReducerType {
  [key: string]: Function;
}

export { NotebookType, ProjectType, CellType, CellTypeEnum, CodeEnum };
