/* eslint-disable react/button-has-type */
/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../components/Page';
import AppBar from '../../components/AppBar';
import Container from '../../components/Container';
import { StateType } from '../../types';
import Notebook from '../../components/Notebook';
import { selectFile, createNotebook } from '../../store/actions';
import { getNotebookIndexById, createNewTitle, generateUrl } from '../../store/selectors';

const Menu = styled.div`
  margin-left: auto;
  margin-right: 64px;
  display: flex;

  & > a {
    color: white;
  }
  & > button {
    margin-left: 12px;
    font-size: 20px;
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const contentBase = process.env.CONTENT_BASE || '';

const Home: FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, publisher, website, editor] = useSelector((state: StateType) => [
    state.files,
    state.publisher,
    state.website,
    state.editor,
  ]);

  const handleCreate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const title = createNewTitle(files);
    dispatch(createNotebook({ title }));
    navigate(generateUrl(publisher.name as string, title));
  };

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
          <Link to={`${contentBase}/p/jtyper`}>Examples</Link>
          <button onClick={handleCreate}>Create a notebook</button>
        </Menu>
      </AppBar>
      <Wrapper>
        <Container noDrawer>{content}</Container>
      </Wrapper>
    </Page>
  );
};

export default Home;
