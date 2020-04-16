/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StateType, ActionType, MiddlewareType } from '../../types';

const middlewares: MiddlewareType = {
  runCode: async () => {
    // const state = { ...prevState };
  },
  editCode: async (_action: ActionType, prevState: StateType, dispatch: Function) => {
    const state = { ...prevState };
    dispatch({ type: 'setTitle', title: state.title });
  },
};

export default middlewares;
