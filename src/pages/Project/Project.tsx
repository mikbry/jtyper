/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { selectFile } from '../../store/actions';
import { StateType } from '../../types';
import Dialog from '../../components/Dialog';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Project: FunctionComponent = () => {
  const { publisherName, notebookId } = useParams();
  const [displayCreateNotebook, toggleCreateNotebook] = useState(false);
  const dispatch = useDispatch();
  const [files, publisher, editor] = useSelector((state: StateType) => [state.files, state.publisher, state.editor]);
  if (publisher.name && publisher.name.toLowerCase() !== publisherName) {
    return <PageError code={404} description="Publisher doesn't exist." />;
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
    // TODO
    console.log('action', action);
    toggleCreateNotebook(false);
  };

  if (editor.selected !== undefined && i !== editor.selected) {
    // Another screen
    dispatch(selectFile({ selected: i }));
    return <div>Please wait</div>;
  }
  let modal;
  if (displayCreateNotebook) {
    modal = (
      <Dialog title='Create a notebook' actions={['Ok', 'Cancel']} onAction={handleCreatedNotebook}>
        <Input placeholder='Notebook name' />
        <p>This notebook will be stored locally in your browser storage.</p>
      </Dialog>
    );
  } else if (editor.displayHelp) {
    modal = <Help />;
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
