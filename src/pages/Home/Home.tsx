/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../components/Page';
import AppBar from '../../components/AppBar';
import Container from '../../components/Container';
import { StateType } from '../../types';
import Notebook from '../../components/Notebook';
import { selectFile } from '../../store/actions';
import { getNotebookIndexById } from '../../store/selectors';

const Menu = styled.div`
  margin-left: auto;
  margin-right: 64px;
  display: flex;

  & > a {
    color: white;
  }
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const contentBase = process.env.CONTENT_BASE || '';

const Home: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [files, website, editor] = useSelector((state: StateType) => [state.files, state.website, state.editor]);

  let content = (
    <Container>
      <div>Welcome to JTyper</div>
      <Link to={`${contentBase}/p/jtyper`}>Project demo</Link>
    </Container>
  );
  let title;
  if (website && website.home) {
    const selected = getNotebookIndexById(website.home, files);
    if (selected !== editor.selected) {
      dispatch(selectFile({ selected }));
    }
    content = <Notebook notebookId={website.home} />;
    title = website.title;
  }
  return (
    <Page>
      <AppBar noDrawer title={title}>
        <Menu>
          <Link to='/p/jtyper'>Examples</Link>
        </Menu>
      </AppBar>
      <Wrapper>
        <Container noDrawer>{content}</Container>
      </Wrapper>
    </Page>
  );
};

export default Home;
