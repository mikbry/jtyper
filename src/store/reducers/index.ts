/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StateType, ReducerType } from '../../types';
import initialState from './initialState';

export const handlers: ReducerType = {
  setTtitle: (state: StateType, title: string): StateType => {
    const { project } = state;
    project.title = title;
    return { ...state, project };
  },
  selectedFile: (state: StateType, selected: number): StateType => {
    const { project } = state;
    project.selected = selected;
    return { ...state, project };
  },
};

export { initialState };
