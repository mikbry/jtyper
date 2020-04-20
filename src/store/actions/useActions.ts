/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineActionDispatchs } from '../combine';
import useStore from '../useStore';
import app from './app';
import { ActionnablesType } from '../../types';

let dispatchers: ActionnablesType;

const useActions = () => {
  const { dispatch } = useStore();

  if (!dispatchers) {
    dispatchers = combineActionDispatchs(app, dispatch, {});
  }
  return dispatchers;
};

export default useActions;
