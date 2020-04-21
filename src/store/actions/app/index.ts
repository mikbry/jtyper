/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, DONE, FETCH } from '../../../constants';
import { ActionType, ActionsType, StateType } from '../../../types';

const init = async (_action: ActionType, _prevState: StateType, dispatch: Function, initEffects: Function) => {
  const document = await initEffects(INITIALIZE, { name: 'document', defaultValue: undefined });
  const files = await initEffects(INITIALIZE, { name: 'files', defaultValue: undefined });
  const editor = await initEffects(INITIALIZE, { name: 'editor', defaultValue: undefined });
  dispatch({ type: INITIALIZE + DONE, document, files, editor });
};

const setTitle = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { title } = action;
  // TODO store project (title)
  dispatch({ type: APP.SETTITLE + DONE, title });
};

const createNotebook = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  // TODO store editor (selected, selectedCell) and new notebook
  dispatch({ ...action, type: APP.CREATENOTEBOOK + DONE });
};

const deleteNotebook = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { index } = action;
  // TODO store editor (selected, selectedCell) and new notebook
  dispatch({ type: APP.DELETENOTEBOOK + DONE, index });
};

const selectFile = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected } = action;
  // TODO store editor
  dispatch({ type: APP.SELECTFILE + DONE, selected });
};

const createCell = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { type } = action;
  // TODO store editor (selectedCell), and current notebook
  dispatch({ type: APP.CREATECELL + DONE, cellType: type });
};

const updateCell = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  // TODO store editor (selectedCell), and current notebook
  dispatch({ ...action, type: APP.UPDATECELL + DONE });
};

const selectCell = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected } = action;
  // TODO store editor
  dispatch({ type: APP.SELECTCELL + DONE, selected });
};

const cut = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { selected, cell } = action;
  // TODO store editor, files
  dispatch({ type: APP.COPY + DONE, selected, cell });
};

const copy = async (action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  const { cell } = action;
  // TODO store editor
  dispatch({ type: APP.COPY + DONE, cell });
};

const paste = async (_action: any, _prevState: StateType, dispatch: Function /* , initEffects: Function */) => {
  // TODO store editor, files
  dispatch({ type: APP.PASTE + DONE });
};

const save = async (_action: any, prevState: StateType, dispatch: Function, initEffects: Function) => {
  const { document, files, editor } = prevState;
  await initEffects(APP.LOCALSAVE + FETCH, { document, files, editor });
  dispatch({ type: APP.LOCALSAVE + DONE });
};

const app: ActionsType = {
  [INITIALIZE]: { init },
  [APP.CREATENOTEBOOK]: { createNotebook },
  [APP.DELETENOTEBOOK]: { deleteNotebook },
  [APP.SETTITLE]: { setTitle },
  [APP.CREATECELL]: { createCell },
  [APP.UPDATECELL]: { updateCell },
  [APP.SELECTFILE]: { selectFile },
  [APP.SELECTCELL]: { selectCell },
  [APP.CUT]: { cut },
  [APP.COPY]: { copy },
  [APP.PASTE]: { paste },
  [APP.LOCALSAVE]: { save },
};

export default app;
