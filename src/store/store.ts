/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent, createContext, useContext, useReducer, SetStateAction, Dispatch } from 'react';
import { handlers, initialState } from './reducers';
import middlewares from './middlewares';
import { ActionType, StateType } from '../types';

interface ContextType extends StateType {
  dispatch: Dispatch<SetStateAction<ContextType>>; // (action: ActionType) => void;
}

const store = createContext<Partial<ContextType>>(initialState);

const useStore = () => useContext(store);

let dispatchStore: Function;

const reducer = (state: StateType, action: ActionType) => {
  const func: Function = handlers[action.type];
  if (middlewares[action.type]) {
    middlewares[action.type](action, state, dispatchStore);
    return state;
  }
  if (func) {
    return func(state, action);
  }
  throw new Error(`Unhandled action type: ${action.type}`);
};

const StoreProvider: FunctionComponent<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  dispatchStore = dispatch;
  const props = { value: { ...state, dispatch } };
  return React.createElement(store.Provider, props, children);
};

export { store, useStore, StoreProvider };
