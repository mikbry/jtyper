/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageError from '../../components/PageError';
import AppBar from '../../components/AppBar';
import Toolbar from '../../components/Toolbar';
import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Explorer from '../../components/Explorer';
import Container from '../../components/Container';
import Notebook from '../../components/Notebook';
import Help from '../../components/Help';
import Input from '../../components/Input';
import { createNotebook, selectFile, toggleHelp } from '../../store/actions';
import { StateType, PublisherType, NotebookType, EditorType } from '../../types';
import Dialog from '../../components/Dialog';
import { createNewTitle, generateUrl } from '../../store/selectors';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Project: FunctionComponent = () => {
  const { publisherName, notebookId } = useParams();
  const [displayCreateNotebook, toggleCreateNotebook] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [f, p, ed] = useSelector((state: StateType) => [state.files, state.publisher, state.website, state.editor]);
  const files = f as NotebookType[];
  const publisher = p as PublisherType;
  const editor = ed as EditorType;
  if (publisher.name && publisher.name.toLowerCase() !== publisherName) {
    return <PageError code={404} description='Publisher do not exist.' />;
  }
  const i = files.findIndex(
    (file, index) =>
      (notebookId === undefined && index === 0) || (file.title && file.title.toLowerCase() === notebookId),
  );
  if (i === -1) {
    return <PageError code={404} description='Notebook was not found.' />;
  }

  const handleCreateNotebook = () => {
    toggleCreateNotebook(true);
  };

  const handleCreatedNotebook = (action: string) => {
    let toggle = false;
    if (name.length > 0 && action === 'Create') {
      // Create
      const title = createNewTitle(files, name);
      dispatch(createNotebook({ title }));
      navigate(generateUrl(publisher.name as string, title));
    } else if (action === 'Create') {
      toggle = true;
    }
    toggleCreateNotebook(toggle);
  };

  const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.trim().length > 0) {
      setName(text);
    }
  };

  const handleHideHelp = () => {
    dispatch(toggleHelp({ enable: false }));
  };

  if (editor.selected !== undefined && i !== editor.selected) {
    // Another screen
    dispatch(selectFile({ selected: i }));
    return <div>Please wait</div>;
  }
  let modal;
  if (displayCreateNotebook) {
    modal = (
      <Dialog title='New notebook' actions={['Create', 'Cancel']} onAction={handleCreatedNotebook}>
        <Input placeholder='Notebook name' defaultValue={name} onChange={handleNameChanged} />
        <p>This notebook will be stored locally in your browser storage.</p>
      </Dialog>
    );
  } else if (editor.displayHelp) {
    modal = <Help onClose={handleHideHelp} />;
  }
  let explorer;
  let noDrawer = true;
  if (!editor.hideExplorer) {
    explorer = (
      <Drawer>
        <Header />
        <Explorer onCreateNotebook={handleCreateNotebook} />
      </Drawer>
    );
    noDrawer = false;
  }
  let topBar;
  if (!editor.hideTopBar) {
    topBar = (
      <AppBar noDrawer={noDrawer}>
        <Toolbar />
      </AppBar>
    );
  }
  return (
    <Page>
      {topBar}
      <Wrapper>
        {explorer}
        <Container noDrawer={noDrawer}>
          <Notebook />
        </Container>
      </Wrapper>
      {modal}
    </Page>
  );
};

export default Project;
