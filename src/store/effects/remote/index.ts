/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP, INITIALIZE, SERVER, FETCH } from '../../../constants';
import { ActionsType, NotebookType, CellType } from '../../../types';
import { generateId } from '../../selectors';

type CELLFILE = {
  // eslint-disable-next-line prettier/prettier
  'cell_type': 'markdown' | 'code' | 'raw';
  source: string[];
};

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
          readOnly: true,
          state: undefined,
          error: undefined,
        };
        files.push(notebook);
      }
    });
  }
  return files;
};

const getNotebook = async ({ notebook }: { notebook: NotebookType }) => {
  let url = process.env.PUBLIC_URL || '';
  url += process.env.CONTENT_BASE || '';
  url += `/${process.env.NOTEBOOK_PATH}/`;
  url += notebook.url as string;
  const req = await fetch(url);
  const data = await req.json();
  const cells: CellType[] = [];
  data.cells.forEach((c: CELLFILE) => {
    cells.push({ id: generateId(), format: c.cell_type, raw: c.source[0] });
  });
  return { ...notebook, cells, state: 'loaded' };
};

const files: ActionsType = {
  [INITIALIZE + SERVER]: { getNotebooks },
  [APP.REQUESTNOTEBOOK + FETCH]: { getNotebook },
};

export default files;
