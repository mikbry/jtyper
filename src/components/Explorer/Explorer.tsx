/* eslint-disable no-unused-vars */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { FileText2 } from '@styled-icons/icomoon/FileText2';
import { Copy } from '@styled-icons/icomoon/Copy';
import { Bin } from '@styled-icons/icomoon/Bin';
import { useSelector } from 'react-redux';
import { useActions } from '../../store';
import { StateType, NotebookType } from '../../types';
import { DrawerToolbar, DrawerFooter } from '../Drawer';
import IconButton from '../IconButton';
import Item from '../Item';
import { getCurrentNotebook } from '../../store/selectors';

const Explorer: FunctionComponent = () => {
  const [files, editor] = useSelector((state: StateType) => [state.files, state.editor]);
  const { createNotebook, deleteNotebook, selectFile } = useActions();
  const notebook = getCurrentNotebook(editor, files);
  const handleCreate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    createNotebook();
  };
  const handleDuplicate = () => {
    createNotebook(notebook);
  };
  const handleDelete = () => {
    deleteNotebook({ index: editor.selected });
  };
  const handleSelect = (event: React.MouseEvent<HTMLElement>, selected: number) => {
    event.preventDefault();
    selectFile({ selected });
  };
  const { selected } = editor;
  return (
    <>
      <DrawerToolbar>
        Files
        <div>
          <IconButton size={14} icon={FileText2} onClick={handleCreate} />
          <IconButton size={14} icon={Copy} disabled={selected === undefined} onClick={handleDuplicate} />
          <IconButton
            size={14}
            icon={Bin}
            disabled={notebook ? notebook.readOnly : selected === undefined}
            onClick={handleDelete}
          />
        </div>
      </DrawerToolbar>
      <li>
        {files?.map((file: NotebookType, index: number) => (
          <Item key={file.id} onClick={e => handleSelect(e, index)} selected={index === selected}>
            {file.title}
          </Item>
        ))}
      </li>
      <DrawerFooter>JTyper v0.1</DrawerFooter>
    </>
  );
};
export default Explorer;
