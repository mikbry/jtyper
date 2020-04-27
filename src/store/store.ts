/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createStore, applyMiddleware, Reducer, Store, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { init } from './actions';
import createEffects, { composer } from './effects';
import { reducers } from './reducers';
import { StateType } from '../types';
import { composeEnhancers } from './devtools';

let store: Store;

const handler: Reducer = (state: StateType, action: AnyAction) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
};

export const initStore = async (initialState: StateType, disableEffects = false) => {
  createEffects();
  const fxComposer = disableEffects ? undefined : composer;
  const doInit = init(fxComposer);
  const action = await doInit();
  const state = reducers[action.type](initialState, action);
  const middlewares = [thunk];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  store = createStore(handler, state, enhancer);
  return store;
};
