/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { LogEntryType } from '../../types';

interface Props {
  out?: LogEntryType[];
}

const Action: FunctionComponent<Props> = ({ out }) => {
  const inp = out ? 'In[*]' : 'In[    ]';
  return <span>{inp}</span>;
};

export default Action;
