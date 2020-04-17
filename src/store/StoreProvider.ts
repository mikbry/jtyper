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
  const [state, dispatch] = useReducer((prevState: StateType, action: ActionType) => {
    const func = store.reducers[action.type];
    if (func) {
      const newState = func(prevState, action);
      return { ...prevState, ...newState };
    }
    return prevState;
  }, getInitialState());

  const { Provider } = context;
  const props = { value: { ...state, dispatch } };
  return React.createElement(Provider, props, children);
};

export default StoreProvider;
