/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { initialState, handlers } from './reducers';
import createActions from './actions';
import createEffects, { composeEffects } from './effects';
import { INITIALIZE } from '../constants';
import { ActionType, StateType } from '../types';

interface StoreType {
  effects?: any;
  actions?: any;
  reducers?: any;
  initialState?: StateType;
}
const store: Partial<StoreType> = {};

export const composer = async (type: string, parameters: any) => composeEffects(store.effects, type, parameters);

export const initState = async () => {
  store.actions = createActions();
  store.effects = createEffects();
  store.reducers = handlers;
  let state = initialState;
  const dispatch = (action: ActionType) => {
    const func = handlers[action.type];
    if (func) {
      state = func(state, action);
    }
  };
  if (store.actions[INITIALIZE]) {
    await store.actions[INITIALIZE](null, null, dispatch, composer);
  }
  store.initialState = state;
  // Make store immutable
  Object.freeze(store);
  return state;
};

export const getInitialState = () => store.initialState;

export default store;
