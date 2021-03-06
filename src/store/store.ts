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
import { INITIALIZE, DONE } from '../constants';
import createEffects, { composer } from './effects';
import { reducers } from './reducers';
import { StateType, PackageType } from '../types';
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
  const [_state, postInit] = await init(fxComposer);
  let state = _state as StateType;
  // TODO get name/version from process.env
  const pk = {
    name: process.env.APP_NAME || 'JTyper',
    version: process.env.APP_VERSION || '0.1.0',
    homepage: process.env.APP_HOMEPAGE || 'https://github.com/mikbry/jtyper',
  };
  state = reducers[INITIALIZE + DONE]({ ...initialState, package: pk as PackageType }, state);
  const middlewares = [thunk];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  store = createStore(handler, state, enhancer);
  postInit(store, fxComposer);
  return store;
};
