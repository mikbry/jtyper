/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineEffects } from '../combine';
import storage from './localStorage';

let effects: any;

export default () => {
  effects = combineEffects(storage, []);
  return effects;
};

export const composeEffects = async (fx: any, type: any, action: any) => {
  const promises: any = [];
  fx.forEach((effect: any) => {
    if (effect.type === type) {
      const p = effect.func(action);
      promises.push(p);
    }
  });
  if (promises.length === 1) {
    const data = await promises[0];
    return data;
  }
  const results = await Promise.all(promises);
  // TODO merge results
  return results;
};

export const composer = async (type: string, parameters: any) => composeEffects(effects, type, parameters);
