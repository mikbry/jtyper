/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createStore, applyMiddleware, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import createActions from './actions';
import createEffects, { composer } from './effects';
import { reducers } from './reducers';
import { StateType, ActionType } from '../types';
import { INITIALIZE } from '../constants';
import { composeEnhancers } from './devtools';

interface FuncType {
  effects?: any;
  actions?: any;
  reducers?: any;
  initialState?: StateType;
}
const funcs: Partial<FuncType> = {};

let store: Store;

const handler: Reducer = (state: StateType, action: any) => {
  console.log('action=', action.type);
  if (action.type.startsWith('@@')) {
    return state;
  }
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
};

export const initStore = async (initialState: StateType) => {
  funcs.actions = createActions();
  funcs.effects = createEffects();
  funcs.reducers = reducers;
  let state = initialState;
  const dispatch = (action: ActionType) => {
    const func: Function = reducers[action.type];
    state = func(state, action);
  };
  const doInit = funcs.actions[INITIALIZE](null, null, composer);
  const action = await doInit();
  dispatch(action);
  funcs.initialState = state;
  // Make store immutable
  Object.freeze(funcs);
  const middlewares = [thunk];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  store = createStore(handler, state, enhancer);
};

export const setStore = (s: Store) => {
  store = s;
};

export const useStore = () => store;
