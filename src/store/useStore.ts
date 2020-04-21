/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useContext, Dispatch } from 'react';
import context from './context';
import { handlers } from './reducers';
import store, { composer } from './store';
import { LocalContextType, ActionType } from '../types';

const useStore = (): LocalContextType => {
  const { dispatch: dispatchStore, ...state } = useContext(context);
  const dispatch: Dispatch<ActionType> = (action: ActionType) => {
    const func = handlers[action.type];
    if (store.actions[action.type]) {
      store.actions[action.type](action, state, dispatch, composer).then();
    } else if (func && dispatchStore) {
      dispatchStore({ ...action });
    } else {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
  const { document = { title: 'noname' }, files = [], editor = {}, saved } = state;
  return { document, files, editor, saved, dispatch };
};

export default useStore;
