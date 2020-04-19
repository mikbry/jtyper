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

const setTitle = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { title } = action;
  // TODO store project (title)
  // await initEffects(APP.SETTITLE, { name: 'app', title });
  dispatch({ type: APP.SETTITLE + DONE, title });
};

const createNotebook = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { title } = action;
  // TODO store project (selected, selectedCell) and new notebook
  // await initEffects(APP.CREATENOTEBOOK, { name: 'app', title });
  dispatch({ type: APP.CREATENOTEBOOK + DONE, title });
};

const selectFile = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected } = action;
  // TODO store project
  // await initEffects(APP.SELECTFILE + DONE, { name: 'app' });
  dispatch({ type: APP.SELECTFILE + DONE, selected });
};

const createCell = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { type } = action;
  // TODO store project (selectedCell), and current notebook
  // await initEffects(APP.CREATENOTEBOOK, { name: 'app', title });
  dispatch({ type: APP.CREATECELL + DONE, cellType: type });
};

const selectCell = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected } = action;
  // TODO store project
  // await initEffects(APP.SELECTCELL + DONE, { name: 'app' });
  dispatch({ type: APP.SELECTCELL + DONE, selected });
};

const auth = {
  [INITIALIZE]: { init },
  [APP.CREATENOTEBOOK]: { createNotebook },
  [APP.SETTITLE]: { setTitle },
  [APP.CREATECELL]: { createCell },
  [APP.SELECTFILE]: { selectFile },
  [APP.SELECTCELL]: { selectCell },
};

export default auth;
