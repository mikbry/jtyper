/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, STORAGE, FETCH } from '../../../constants';
import { ActionsType } from '../../../types';

const get = async ({ name, defaultValue }: any) => {
  const raw = window.localStorage.getItem(name) || undefined;
  let data = defaultValue;
  if (raw) {
    data = JSON.parse(raw);
  }
  // TODO check data
  return data;
};

const set = async (data: any) => {
  const names = Object.keys(data);
  names.forEach(name => {
    const json = JSON.stringify(data[name]);
    // TODO check json
    window.localStorage.setItem(name, json);
    /* if (!data[name]) {
      window.localStorage.removeItem(name);
    } else {
      const json = JSON.stringify(data[name]);
      // TODO check json
      window.localStorage.setItem(name, json);
    } */
  });
};

const storage: ActionsType = {
  [INITIALIZE + STORAGE]: { get },
  [APP.LOCALSAVE + FETCH]: { set },
};

export default storage;
