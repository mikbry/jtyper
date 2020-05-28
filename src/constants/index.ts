/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const INITIALIZE = 'INITIAL_STATE';

export const STORAGE = '.STORAGE';
export const SERVER = '.SERVER';

export const REQUEST = ':REQUEST';
export const DONE = ':DONE';
export const FETCH = ':FETCH';

export const APP = {
  INIT: 'APP_INIT',
  REQUESTNOTEBOOK: 'REQUESTNOTEBOOK',
  CREATENOTEBOOK: 'APP_CREATENOTEBOOK',
  UPDATENOTEBOOK: 'APP_UPDATENOTEBOOK',
  DELETENOTEBOOK: 'APP_DELETENOTEBOOK',
  CREATECELL: 'APP_CREATECELL',
  DELETECELL: 'APP_DELETECELL',
  SELECTFILE: 'APP_SELECTFILE',
  SELECTCELL: 'APP_SELECTCELL',
  UPDATECELL: 'APP_UPDATECELL',
  RUNCELL: 'APP_RUNCELL',
  RESETCELL: 'APP_RESETCELL',
  RESETALLCELL: 'APP_RESETALLCELL',
  CUT: 'APP_CUT',
  COPY: 'APP_COPY',
  PASTE: 'APP_PASTE',
  LOCALSAVE: 'APP_LOCALSAVE',
};
