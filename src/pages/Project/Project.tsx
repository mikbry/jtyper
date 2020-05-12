/* eslint-disable jsx-a11y/accessible-emoji */
/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../components/Page';
import AppBar from '../../components/AppBar';
import Toolbar from '../../components/Toolbar';
import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Explorer from '../../components/Explorer';
import Container from '../../components/Container';
import Notebook from '../../components/Notebook';
import { selectFile } from '../../store/actions';
import { StateType } from '../../types';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Project: FunctionComponent = () => {
  const { publisherName, notebookId } = useParams();
  const dispatch = useDispatch();
  const [files, publisher, editor] = useSelector((state: StateType) => [state.files, state.publisher, state.editor]);
  if (publisher.name && publisher.name.toLowerCase() !== publisherName) {
    return (
      <Page>
        <div>404 Publisher doesn&apos;t exist</div>
      </Page>
    );
  }
  const i = files.findIndex(
    (file, index) =>
      (notebookId === undefined && index === 0) ||
      file.id === notebookId ||
      (file.filename && file.filename.toLowerCase() === notebookId) ||
      (file.title && file.title.toLowerCase() === notebookId),
  );
  if (i === -1) {
    return (
      <Page>
        <div>404 Notebook not found</div>
      </Page>
    );
  }
  if (editor.selected && i !== editor.selected) {
    // Another screen
    dispatch(selectFile({ selected: i }));
  }
  return (
    <Page>
      <AppBar>
        <Toolbar />
      </AppBar>
      <Wrapper>
        <Drawer>
          <Header />
          <Explorer />
        </Drawer>
        <Container>
          <Notebook />
        </Container>
      </Wrapper>
    </Page>
  );
};

export default Project;
