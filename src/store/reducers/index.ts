/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StateType, ReducerType } from '../../types';

export const initialState: StateType = {
  title: 'JTyper',
};

export const handlers: ReducerType = {
  setTtitle: (state: StateType, title: string): StateType => ({ ...state, title }),
};
