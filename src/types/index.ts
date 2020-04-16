/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface StateType {
  // TODO
  title: string;
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
