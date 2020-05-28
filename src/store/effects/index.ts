/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EffectsType, ComposerParameters, ComposerPromise } from '../../types';
import storage from './localStorage';
import files from './remote';

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

let effects: EffectsType;

export const initEffects = (fxs: Record<string, Record<string, Function>>[]) => {
  effects = [];
  fxs.forEach(fx => {
    effects = combineEffects(fx, effects);
  });
  return effects;
};

export default () => initEffects([storage, files]);

type FxType = { type: string; func: Function };

export const composeEffects = async (composer: Array<FxType>, type: string, action: ComposerParameters) => {
  const promises: ComposerPromise[] = [];
  composer.forEach((effect: FxType) => {
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

export const composer = async (type: string, parameters: ComposerParameters) =>
  composeEffects(effects, type, parameters);
