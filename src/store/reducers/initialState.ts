/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StateType } from '../../types';

const initialState: StateType = {
  publisher: {
    name: 'jtyper',
  },
  document: {
    title: 'project',
  },
  files: [
    {
      id: 'dfggf',
      title: 'Home',
      readOnly: true,
      cells: [
        {
          raw: '# Wecome to JTyper\n## This notebook will show you how easy it is to create one !',
          id: 'a',
          format: 'markdown',
        },
        { raw: 'Try this code to see how JTyper works !', id: 'b' },
        { raw: `print('hellow world !')`, id: 'c', format: 'code' },
      ],
    },
  ],
  editor: {
    selected: 0,
  },
};

export default initialState;
