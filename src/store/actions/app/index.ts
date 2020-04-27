/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'redux';
import { APP, INITIALIZE, DONE, FETCH } from '../../../constants';
import { StateType } from '../../../types';
import { composer } from '../../effects';

const init = (fxComposer: any) => async () => {
  if (fxComposer) {
    const document = await fxComposer(INITIALIZE, { name: 'document', defaultValue: undefined });
    const files = await fxComposer(INITIALIZE, { name: 'files', defaultValue: undefined });
    const editor = await fxComposer(INITIALIZE, { name: 'editor', defaultValue: undefined });
    return { type: INITIALIZE + DONE, document, files, editor };
  }
  return { type: INITIALIZE + DONE };
};

const save = (action: any = {}) => (dispatch: Dispatch, prevState: any) => {
  const { document, files, editor } = prevState();
  let data: Partial<StateType>;
  // Not used for instance
  /* if (action.document) {
    data = { document };
  } else if (action.files) {
    data = { files };
  } else */
  if (action.editor) {
    data = { editor };
  } else {
    data = { document, files, editor };
  }
  composer(APP.LOCALSAVE + FETCH, data).then(() => dispatch({ type: APP.LOCALSAVE + DONE }));
};

const createNotebook = (action: any | undefined = {}) => (dispatch: Dispatch<any>) => {
  dispatch({ ...action, type: APP.CREATENOTEBOOK + DONE });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const deleteNotebook = (action: any) => (dispatch: Dispatch<any>) => {
  const { index } = action;
  dispatch({ type: APP.DELETENOTEBOOK + DONE, index });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const selectFile = (action: any) => (dispatch: Dispatch<any>) => {
  const { selected } = action;
  dispatch({ type: APP.SELECTFILE + DONE, selected });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const createCell = (action: any = {}) => (dispatch: Dispatch<any>) => {
  const { type } = action;
  dispatch({ type: APP.CREATECELL + DONE, cellType: type });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const updateCell = (action: any) => (dispatch: Dispatch<any>) => {
  dispatch({ ...action, type: APP.UPDATECELL + DONE });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const selectCell = (action: any) => (dispatch: Dispatch<any>) => {
  const { selected } = action;
  dispatch({ type: APP.SELECTCELL + DONE, selected });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const cut = (action: any) => (dispatch: Dispatch<any>) => {
  const { selected, cell } = action;
  dispatch({ type: APP.COPY + DONE, selected, cell });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const copy = (action: any) => (dispatch: Dispatch<any>) => {
  const { cell } = action;
  dispatch({ type: APP.COPY + DONE, cell });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

const paste = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: APP.PASTE + DONE });
  dispatch(save({ type: APP.LOCALSAVE, editor: true }));
};

export { init, createNotebook, deleteNotebook, createCell, selectCell, updateCell, selectFile, cut, copy, paste, save };
