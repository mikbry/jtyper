/* eslint-disable no-unused-vars */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FileText2 } from '@styled-icons/icomoon/FileText2';
import { Copy } from '@styled-icons/icomoon/Copy';
import { Bin } from '@styled-icons/icomoon/Bin';
import { useSelector, useDispatch } from 'react-redux';
import { createNotebook, deleteNotebook, selectFile } from '../../store/actions';
import { StateType, NotebookType, PublisherType, PackageType } from '../../types';
import { DrawerToolbar, DrawerFooter } from '../Drawer';
import IconButton from '../IconButton';
import Item from '../Item';
import { getNotebook, createNewTitle, generateUrl, getNextFile } from '../../store/selectors';

const List = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
`;

const Explorer: FunctionComponent<{ onCreateNotebook?: Function }> = ({ onCreateNotebook }) => {
  const [publisher, files, editor, pkg] = useSelector((state: StateType) => [
    state.publisher as PublisherType,
    state.files,
    state.editor,
    state.package as PackageType,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notebook = getNotebook(editor.selected, files) as NotebookType;
  const handleCreate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (onCreateNotebook) {
      onCreateNotebook();
    } else {
      const title = createNewTitle(files);
      dispatch(createNotebook({ title }));
      navigate(generateUrl(publisher.name as string, title));
    }
  };
  const handleDuplicate = () => {
    const title = createNewTitle(files, notebook.title);
    dispatch(createNotebook({ ...notebook, title }));
    navigate(generateUrl(publisher.name as string, title));
  };
  const handleDelete = () => {
    const selected = getNextFile(files.length - 1, editor.selected);
    const n = getNotebook(selected, files);
    dispatch(deleteNotebook({ index: editor.selected as number }));
    navigate(generateUrl(publisher.name as string, n?.title));
  };
  const handleSelect = (event: React.MouseEvent<HTMLElement>, selected: number) => {
    event.preventDefault();
    const n = getNotebook(selected, files) as NotebookType;
    dispatch(selectFile({ selected }));
    navigate(generateUrl(publisher.name as string, n.title));
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
      <List>
        {files?.map((file: NotebookType, index: number) => (
          <Item key={file.id} onClick={e => handleSelect(e, index)} selected={index === selected}>
            {file.title}
          </Item>
        ))}
      </List>
      <DrawerFooter>
        <a href={pkg.homepage} target='_blank' rel='noopener noreferrer'>
          {pkg.name} v{pkg.version}
        </a>
      </DrawerFooter>
    </>
  );
};
export default Explorer;
