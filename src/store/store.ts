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
import createEffects, { composeEffects } from './effects';
import { initialState, reducers } from './reducers';
import { StateType, ActionType } from '../types';
import { INITIALIZE } from '../constants';

interface FuncType {
  effects?: any;
  actions?: any;
  reducers?: any;
  initialState?: StateType;
}
const funcs: Partial<FuncType> = {};

export const composer = async (type: string, parameters: any) => composeEffects(funcs.effects, type, parameters);

let store: Store;

const handler: Reducer = (state: StateType, firstAction: any) => {
  console.log('action=', firstAction.type);
  if (firstAction.type.startsWith('@@redux/INIT')) {
    return state;
  }
  let pipe = [firstAction];
  const dispatchStore = store.dispatch;
  while (pipe.length > 0) {
    const action: ActionType | undefined = pipe.shift();
    if (action) {
      console.log('dispatchio', action.type);
      console.log('dispatchio', action.type, state);
      if (funcs.actions[action.type]) {
        const next: Array<ActionType> | Function = funcs.actions[action.type](action, state, composer);
        console.log('next', next);
        if (Array.isArray(next)) {
          pipe = pipe.concat(next);
          console.log('concat', pipe);
        } else {
          next().then((a: ActionType) => dispatchStore(a));
        }
      } else if (reducers[action.type]) {
        return reducers[action.type](state, action);
      } else {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
  return state;
};

export const getInitialState = () => funcs.initialState;

export const initStore = (state: StateType) => {
  store = createStore(handler, state, applyMiddleware(thunk));
};

export const initState = async () => {
  funcs.actions = createActions();
  funcs.effects = createEffects();
  funcs.reducers = reducers;
  let state = initialState;
  const dispatch = (action: ActionType) => {
    const func: Function = reducers[action.type];
    if (func) {
      state = func(state, action);
    }
  };
  if (funcs.actions[INITIALIZE]) {
    const doInit = funcs.actions[INITIALIZE](null, null, composer);
    const action = await doInit();
    dispatch(action);
  }
  funcs.initialState = state;
  // Make store immutable
  Object.freeze(funcs);
  initStore(state);
};

export const useStore = () => store;

/* import { initialState, handlers } from './reducers';
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
    const func: Function = handlers[action.type];
    if (func) {
      state = func(state, action);
    }
  };
  if (store.actions[INITIALIZE]) {
    const doInit = store.actions[INITIALIZE](null, null, composer);
    const action = await doInit();
    dispatch(action);
  }
  store.initialState = state;
  // Make store immutable
  Object.freeze(store);
  return state;
};

export const getInitialState = () => store.initialState;
*/
