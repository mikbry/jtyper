/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EffectsType } from '../../types';
import storage from './localStorage';

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

let effects: any;

export const initEffects = (fx: any) => {
  effects = combineEffects(fx, []);
  return effects;
};

export default () => initEffects(storage);

export const composeEffects = async (fx: any, type: any, action: any) => {
  const promises: any = [];
  fx.forEach((effect: any) => {
    if (effect.type === type) {
      const p = effect.func(action);
      promises.push(p);
    }
  });
  const data = await promises[0];
  return data;

  /* if (promises.length === 1) {
    const data = await promises[0];
    return data;
  }
  const results = await Promise.all(promises);
  // TODO merge results
  return results; */
};

export const composer = async (type: string, parameters: any) => composeEffects(effects, type, parameters);
