/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useReducer, FunctionComponent } from 'react';
import context from './context';
import store, { getInitialState } from './store';
import { StateType, ActionType } from '../types';

const StoreProvider: FunctionComponent<{}> = ({ children }) => {
  const memoizedReducer = React.useCallback(
    (prevState: StateType, action: ActionType) => {
      const func = store.reducers[action.type];
      if (func) {
        return func(prevState, action);
      }
      return null;
    },
    [getInitialState()],
  );
  const [state, dispatch] = useReducer(memoizedReducer, getInitialState());

  const { Provider } = context;
  const props = { value: { ...state, dispatch } };
  return React.createElement(Provider, props, children);
};

export default StoreProvider;
