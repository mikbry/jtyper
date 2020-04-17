/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, DONE } from '../../../constants';
import { ActionType, StateType } from '../../../types';

const init = async (_action: ActionType, _prevState: StateType, dispatch: Function, initEffects: Function) => {
  const { project } = await initEffects(INITIALIZE, { name: 'app' });
  dispatch({ type: INITIALIZE + DONE, project });
};

const setTitle = async (action: any, _prevState: StateType, dispatch: Function, initEffects: Function) => {
  const { title } = action;
  await initEffects(APP.SETTITLE, { name: 'app', title });
  dispatch({ type: APP.SETTITLE + DONE, title });
};

const selectFile = async (_action: ActionType, _prevState: StateType, dispatch: Function, initEffects: Function) => {
  await initEffects(APP.SELECTFILE + DONE, { name: 'app' });
  dispatch({ type: APP.SELECTFILE + DONE });
};

const auth = { [INITIALIZE]: { init }, [APP.SETTITLE]: { setTitle }, [APP.SELECTFILE]: { selectFile } };

export default auth;
