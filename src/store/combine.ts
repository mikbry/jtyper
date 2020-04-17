/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const combineDispatchs = (actions: any, dispatch: Function, _to: any) => {
  const to = _to || {};
  const types = Object.keys(actions);
  types.forEach(type => {
    const action = actions[type];
    const name = Object.keys(action)[0];
    to[name] = (payload: any) => dispatch({ type, ...payload });
  });
  return to;
};

export const combineActions = (actions: any, _to: any) => {
  const to = _to || {};
  const types = Object.keys(actions);
  types.forEach(type => {
    const action = actions[type];
    const name = Object.keys(action)[0];
    to[type] = action[name];
  });
  return to;
};

export const combineEffects = (effects: any, _to: any) => {
  const to = _to || [];
  const types = Object.keys(effects);
  types.forEach(type => {
    const effect = effects[type];
    const name = Object.keys(effect)[0];
    to.push({ name, type, func: effect[name] });
  });
  return to;
};
