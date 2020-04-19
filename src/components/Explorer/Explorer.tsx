/* eslint-disable no-unused-vars */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FileText2 } from '@styled-icons/icomoon/FileText2';
import { Copy } from '@styled-icons/icomoon/Copy';
import { Bin } from '@styled-icons/icomoon/Bin';
import { useStore, useActions } from '../../store';
import IconButton from '../IconButton';
import Item from '../Item';
import { getCurrentNotebook } from '../../store/selectors';
import { NotebookType } from '../../types';

const Wrapper = styled.div`
  position: fixed;
  top: ${props => props.theme.spacing.headerHeight}px;
  min-width: ${props => props.theme.spacing.explorerWidth}px;
  min-height: calc(100% - 48px);
  color: ${props => props.theme.palette.onSurface};
  background: ${props => props.theme.palette.menu};
`;

const Bar = styled.div`
  line-height: 26px;
  height: 26px;
  padding: 8px 4px;
  display: flex;
  background: ${props => props.theme.palette.primary};
  border-top: 1px solid ${props => props.theme.palette.divider};
  border-bottom: 2px solid ${props => props.theme.palette.divider};
  & > div {
    margin-left: auto;
  }
`;

const Explorer: FunctionComponent = () => {
  const { files, editor } = useStore();
  const { createNotebook, selectFile } = useActions();
  const handleCreate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    createNotebook();
  };
  const handleDuplicate = () => {
    const notebook = getCurrentNotebook(editor, files);
    createNotebook(notebook);
  };
  const handleDelete = () => {
    // TODO
    console.log('TODO handleDelete');
  };
  const handleSelect = (event: React.MouseEvent<HTMLElement>, selected: number) => {
    event.preventDefault();
    selectFile({ selected });
  };
  const { selected } = editor;
  return (
    <Wrapper>
      <Bar>
        Files
        <div>
          <IconButton icon={FileText2} onClick={handleCreate} />
          <IconButton icon={Copy} disabled={selected === undefined} onClick={handleDuplicate} />
          <IconButton icon={Bin} disabled={selected === undefined} onClick={handleDelete} />
        </div>
      </Bar>
      {files?.map((file: NotebookType, index: number) => (
        <Item key={file.id} onClick={e => handleSelect(e, index)} selected={index === selected}>
          {file.name || file.title}
        </Item>
      ))}
    </Wrapper>
  );
};
export default Explorer;
