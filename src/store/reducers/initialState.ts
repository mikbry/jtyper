/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StateType } from '../../types';

const initialState: StateType = {
  document: {
    title: 'project',
  },
  files: [
    {
      id: 'dfggf',
      name: 'Home',
      readOnly: true,
      cells: [
        { raw: '# Header', id: 'a', format: 'markdown' },
        { raw: 'lorem ipsum', id: 'b' },
        { raw: `print('hellow world !')`, id: 'c', format: 'code' },
      ],
    },
  ],
  editor: {
    selected: 0,
  },
};

export default initialState;
