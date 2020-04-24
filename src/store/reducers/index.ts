/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import app from './app';
import initialState from './initialState';
import { ReducerType } from '../../types';

export const reducers: ReducerType = {
  ...app,
};

export { initialState };
