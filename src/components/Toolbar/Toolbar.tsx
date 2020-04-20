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
  const { createCell, selectCell, cut, copy, paste } = useActions();
  const { selectedCell } = editor;
  const notebook = getCurrentNotebook(editor, files);
  const handleSave = () => {
    // TODO
  };
  const handleCreate = () => {
    createCell();
  };
  const handleCut = () => {
    if (notebook && selectedCell !== undefined) {
      const cell = notebook.cells[selectedCell];
      cut({ cell, selected: selectedCell });
    }
  };
  const handleCopy = () => {
    if (notebook && selectedCell !== undefined) {
      const cell = notebook.cells[selectedCell];
      copy({ cell });
    }
  };
  const handlePaste = () => {
    paste();
  };
  const handleUp = () => {
    const selected = selectedCell === undefined ? 0 : selectedCell - 1;
    selectCell({ selected });
  };
  const handleDown = () => {
    const selected = selectedCell === undefined ? 0 : selectedCell + 1;
    selectCell({ selected });
  };
  let editDisabled = true;
  let navDisabled = true;
  let runDisabled = true;
  if (notebook) {
    const { readOnly } = notebook;
    editDisabled = !!readOnly;
    navDisabled = !!readOnly; // Not working for runnable cells
    runDisabled = false; // TODO
  }

  return (
    <Styled>
      <Bar>
        <IconButton icon={FloppyDisk} disabled={editDisabled} onClick={handleSave} />
      </Bar>
      <Bar>
        <IconButton icon={Plus} disabled={editDisabled} onClick={handleCreate} />
      </Bar>
      <Bar>
        <IconButton icon={Scissors} disabled={editDisabled || selectedCell === undefined} onClick={handleCut} />
        <IconButton icon={Copy} disabled={editDisabled || selectedCell === undefined} onClick={handleCopy} />
        <IconButton icon={Paste} disabled={editDisabled || editor.copyBuffer === undefined} onClick={handlePaste} />
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
