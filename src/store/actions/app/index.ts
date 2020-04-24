/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, DONE, FETCH } from '../../../constants';
import { ActionType, ActionsType, StateType } from '../../../types';

const init = (_action: ActionType, _prevState: StateType, composer: Function) => async () => {
  const document = await composer(INITIALIZE, { name: 'document', defaultValue: undefined });
  const files = await composer(INITIALIZE, { name: 'files', defaultValue: undefined });
  const editor = await composer(INITIALIZE, { name: 'editor', defaultValue: undefined });
  return { type: INITIALIZE + DONE, document, files, editor };
};

const setTitle = (action: any) => {
  const { title } = action;
  return [{ type: APP.SETTITLE + DONE, title }];
};

const createNotebook = (action: any) =>
  // TODO store editor (selected, selectedCell) and new notebook
  [
    { ...action, type: APP.CREATENOTEBOOK + DONE },
    { type: APP.LOCALSAVE, editor: true },
  ];

const deleteNotebook = (action: any) => {
  const { index } = action;
  // TODO store editor (selected, selectedCell) and new notebook
  return [
    { type: APP.DELETENOTEBOOK + DONE, index },
    { type: APP.LOCALSAVE, editor: true },
  ];
};

const selectFile = (action: any) => {
  const { selected } = action;
  // TODO store editor
  return [
    { type: APP.SELECTFILE + DONE, selected },
    { type: APP.LOCALSAVE, editor: true },
  ];
};

const createCell = (action: any) => {
  const { type } = action;
  // TODO store editor (selectedCell), and current notebook
  return [
    { type: APP.CREATECELL + DONE, cellType: type },
    { type: APP.LOCALSAVE, editor: true },
  ];
};

const updateCell = (action: any) =>
  // TODO store editor (selectedCell), and current notebook
  [
    { ...action, type: APP.UPDATECELL + DONE },
    { type: APP.LOCALSAVE, editor: true },
  ];

const selectCell = (action: any) => {
  const { selected } = action;
  // TODO store editor
  return [
    { type: APP.SELECTCELL + DONE, selected },
    { type: APP.LOCALSAVE, editor: true },
  ];
};

const cut = (action: any) => {
  const { selected, cell } = action;
  // TODO store editor, files
  return [
    { type: APP.COPY + DONE, selected, cell },
    { type: APP.LOCALSAVE, editor: true },
  ];
};

const copy = (action: any) => {
  const { cell } = action;
  return [
    { type: APP.COPY + DONE, cell },
    { type: APP.LOCALSAVE, editor: true },
  ];
};

const paste = () => [{ type: APP.PASTE + DONE }, { type: APP.LOCALSAVE, editor: true }];

const save = (action: any, prevState: StateType, composeEffect: Function) => {
  const { document, files, editor } = prevState;
  let data: Partial<StateType>;
  if (action.document) {
    data = { document };
  } else if (action.files) {
    data = { files };
  } else if (action.editor) {
    data = { editor };
  } else {
    data = { document, files, editor };
  }
  console.log('data', data);
  return async () => {
    await composeEffect(APP.LOCALSAVE + FETCH, data);
    return { type: APP.LOCALSAVE + DONE };
  };
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
