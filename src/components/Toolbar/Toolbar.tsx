/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { FloppyDisk } from '@styled-icons/icomoon/FloppyDisk';
import { Plus } from '@styled-icons/icomoon//Plus';
import { Scissors } from '@styled-icons/icomoon/Scissors';
import { Copy } from '@styled-icons/icomoon/Copy';
import { Paste } from '@styled-icons/icomoon/Paste';
import { ArrowUp } from '@styled-icons/icomoon/ArrowUp';
import { ArrowDown } from '@styled-icons/icomoon/ArrowDown';
import { Next2 } from '@styled-icons/icomoon/Next2';
import { Stop2 } from '@styled-icons/icomoon//Stop2';
import { History } from '@styled-icons/icomoon/History';
import { Forward3 } from '@styled-icons/icomoon/Forward3';

import { useStore, useActions } from '../../store';
import { getCurrentNotebook } from '../../store/selectors';
import IconButton from '../IconButton';

const Styled = styled.div`
  margin-left: auto;
  margin-right: 64px;
  display: flex;
`;

const Bar = styled.div`
  margin: 4px;
  line-height: 36px;
  border: 1px solid ${props => props.theme.palette.group};
`;

const Toolbar: FunctionComponent = () => {
  const { editor, files } = useStore();
  const { createCell, selectCell } = useActions();
  const handleSave = () => {
    // TODO
    console.log('TODO handleSave');
  };
  const handleCreate = () => {
    createCell();
  };
  const handleUp = () => {
    selectCell(0);
  };
  const handleDown = () => {
    selectCell(0);
  };
  const notebook = getCurrentNotebook(editor, files);
  let editDiabled = true;
  let navDisabled = true;
  let runDisabled = true;
  if (notebook) {
    const { readOnly } = notebook;
    editDiabled = !!readOnly;
    // TODO
    navDisabled = false;
    runDisabled = false;
  }

  return (
    <Styled>
      <Bar>
        <IconButton icon={FloppyDisk} disabled={editDiabled} onClick={handleSave} />
      </Bar>
      <Bar>
        <IconButton icon={Plus} disabled={editDiabled} onClick={handleCreate} />
      </Bar>
      <Bar>
        <IconButton icon={Scissors} disabled={editDiabled} onClick={handleSave} />
        <IconButton icon={Copy} disabled={editDiabled} onClick={handleSave} />
        <IconButton icon={Paste} disabled={editDiabled} onClick={handleSave} />
      </Bar>
      <Bar>
        <IconButton icon={ArrowUp} disabled={navDisabled} onClick={handleUp} />
        <IconButton icon={ArrowDown} disabled={navDisabled} onClick={handleDown} />
      </Bar>
      <Bar>
        <IconButton icon={Next2} disabled={runDisabled} onClick={handleSave}>
          Run
        </IconButton>
        <IconButton icon={Stop2} disabled={runDisabled} onClick={handleSave} />
        <IconButton icon={History} disabled={runDisabled} onClick={handleSave} />
        <IconButton icon={Forward3} disabled={runDisabled} onClick={handleSave} />
      </Bar>
    </Styled>
  );
};

export default Toolbar;
