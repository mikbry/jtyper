/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, DONE } from '../../../constants';
import { ActionType, ActionsType, StateType } from '../../../types';

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
  // TODO store editor (selected, selectedCell) and new notebook
  // await initEffects(APP.CREATENOTEBOOK, { name: 'app', title });
  dispatch({ ...action, type: APP.CREATENOTEBOOK + DONE });
};

const deleteNotebook = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { index } = action;
  // TODO store editor (selected, selectedCell) and new notebook
  // await initEffects(APP.CREATENOTEBOOK, { name: 'app', title });
  dispatch({ type: APP.DELETENOTEBOOK + DONE, index });
};

const selectFile = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected } = action;
  // TODO store editor
  // await initEffects(APP.SELECTFILE + DONE, { name: 'app' });
  dispatch({ type: APP.SELECTFILE + DONE, selected });
};

const createCell = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { type } = action;
  // TODO store editor (selectedCell), and current notebook
  // await initEffects(APP.CREATENOTEBOOK, { name: 'app', title });
  dispatch({ type: APP.CREATECELL + DONE, cellType: type });
};

const selectCell = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected } = action;
  // TODO store editor
  // await initEffects(APP.SELECTCELL + DONE, { name: 'app' });
  dispatch({ type: APP.SELECTCELL + DONE, selected });
};

const cut = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected, cell } = action;
  // TODO store editor, files
  // await initEffects(APP.SELECTCELL + DONE, { name: 'app' });
  dispatch({ type: APP.COPY + DONE, selected, cell });
};

const copy = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { cell } = action;
  // TODO store editor
  // await initEffects(APP.SELECTCELL + DONE, { name: 'app' });
  dispatch({ type: APP.COPY + DONE, cell });
};

const paste = async (_action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  // TODO store editor, files
  // await initEffects(APP.SELECTCELL + DONE, { name: 'app' });
  dispatch({ type: APP.PASTE + DONE });
};

const app: ActionsType = {
  [INITIALIZE]: { init },
  [APP.CREATENOTEBOOK]: { createNotebook },
  [APP.DELETENOTEBOOK]: { deleteNotebook },
  [APP.SETTITLE]: { setTitle },
  [APP.CREATECELL]: { createCell },
  [APP.SELECTFILE]: { selectFile },
  [APP.SELECTCELL]: { selectCell },
  [APP.CUT]: { cut },
  [APP.COPY]: { copy },
  [APP.PASTE]: { paste },
};

export default app;
