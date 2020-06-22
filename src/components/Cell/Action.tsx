/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { Play3 } from '@styled-icons/icomoon/Play3';
import { LogEntryType } from '../../types';
import IconButton from '../IconButton';

interface Props {
  out?: LogEntryType[];
  selectionColor: string;
  onAction: (action: string) => void;
}

const Action: FunctionComponent<Props> = ({ out, selectionColor, onAction }) => {
  const color = out ? 'green' : undefined;
  const hover = out ? 'green' : selectionColor;
  const handleRun = () => {
    //
    onAction('run');
  };
  return (
    <>
      <IconButton icon={Play3} onClick={handleRun} hover={hover} color={color} />
    </>
  );
};

export default Action;
