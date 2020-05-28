/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, SERVER, FETCH } from '../../../constants';
import { ActionsType } from '../../../types';

const getNotebooks = async ({ url }: any) => {
  const req = await fetch(url);
  const data = await req.json();
  const files: any = [];
  if (data.files) {
    // TODO parse data files
  }
  return files;
};

const getNotebook = async ({ url }: any) => {
  const req = await fetch(url);
  const data = await req.json();

  // TODO parse data
  return data;
};

const files: ActionsType = {
  [INITIALIZE + SERVER]: { fetchNotebooks: getNotebooks },
  [APP.REQUESTNOTEBOOK + FETCH]: { getNotebook },
};

export default files;
