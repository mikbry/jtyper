/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, SERVER, FETCH } from '../../../constants';
import { ActionsType, NotebookType } from '../../../types';

type NOTEBOOKFILE = {
  metadata: { id: string; title: string };
  type: string;
  source: string[];
};

const getNotebooks = async ({ url }: { url: string }) => {
  const req = await fetch(url);
  const data = await req.json();
  const files: NotebookType[] = [];
  if (data.files) {
    data.files.forEach((f: NOTEBOOKFILE) => {
      if (f.type === 'notebook') {
        const notebook: NotebookType = {
          id: f.metadata.id,
          title: f.metadata.title,
          cells: [],
          url: f.source[0],
          state: undefined,
          error: undefined,
        };
        files.push(notebook);
      }
    });
  }
  return files;
};

const getNotebook = async ({ url }: any) => {
  console.log('getNotebook TODO', url);
  const req = await fetch(url);
  const data = await req.json();

  // TODO parse data
  return data;
};

const files: ActionsType = {
  [INITIALIZE + SERVER]: { getNotebooks },
  [APP.REQUESTNOTEBOOK + FETCH]: { getNotebook },
};

export default files;
