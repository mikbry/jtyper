/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineActions } from '../combine';
import app from './app';

export default () => {
  const actions = combineActions(app, null);
  return actions;
};
