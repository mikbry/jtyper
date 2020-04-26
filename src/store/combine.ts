/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ActionsType, ActionnablesType, EffectsType } from '../types';

export const combineActionDispatchs = (
  actions: ActionsType,
  dispatch: Function,
  _to: ActionnablesType,
): ActionnablesType => {
  const to = _to;
  const types = Object.keys(actions);
  types.forEach(type => {
    const action = actions[type];
    const name = Object.keys(action)[0];
    to[name] = (payload: any) => dispatch(action[name](payload));
  });
  return to;
};

export const combineActions = (actions: ActionsType, _to: ActionnablesType): ActionnablesType => {
  const to = _to;
  const types = Object.keys(actions);
  types.forEach(type => {
    const action: Record<string, Function> = actions[type];
    const name = Object.keys(action)[0];
    to[type] = action[name];
  });
  return to;
};

export const combineEffects = (effects: Record<string, Record<string, Function>>, _to: EffectsType): EffectsType => {
  const to = _to;
  const types = Object.keys(effects);
  types.forEach(type => {
    const effect = effects[type];
    const name = Object.keys(effect)[0];
    to.push({ name, type, func: effect[name] });
  });
  return to;
};
