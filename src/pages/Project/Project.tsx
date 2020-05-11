/* eslint-disable jsx-a11y/accessible-emoji */
/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
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

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Project: FunctionComponent = () => {
  const { projectName } = useParams();
  console.log('projectname:', projectName);
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
