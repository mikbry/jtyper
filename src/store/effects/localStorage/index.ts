/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, DONE } from '../../../constants';
import { ActionsType } from '../../../types';

const get = async ({ name }: any) => {
  const raw = window.localStorage.getItem(name) || '{}';
  const data = JSON.parse(raw);
  // TODO check data
  return data;
};

const set = async ({ name, ...data }: any) => {
  if (Object.keys(data).length === 0) {
    window.localStorage.removeItem(name);
  } else {
    const json = JSON.stringify(data);
    // TODO check json
    window.localStorage.setItem(name, json);
  }
};

const storage: ActionsType = {
  [INITIALIZE]: { get },
  [APP.SETTITLE + DONE]: { set },
  [APP.SELECTFILE + DONE]: { set },
};

export default storage;
