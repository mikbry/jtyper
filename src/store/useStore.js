/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useContext } from 'react';
import context from './context';
import { handlers } from './reducers';
import store, { composer } from './store';

const useStore = () => {
  const { dispatch: dispatchStore, ...state } = useContext(context);
  const dispatch = action => {
    const func = handlers[action.type];
    if (store.actions[action.type]) {
      store.actions[action.type](action, state, dispatch, composer).then();
    } else if (func) {
      dispatchStore(action);
    } else {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
  return { ...state, dispatch };
};

export default useStore;
