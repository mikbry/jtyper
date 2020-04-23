/* eslint-disable jsx-a11y/accessible-emoji */
/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StoreProvider } from './store';
import Page from './components/Page';
import AppBar from './components/AppBar';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Explorer from './components/Explorer';
import Container from './components/Container';
import Notebook from './components/Notebook';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const App: FunctionComponent = () => (
  <StoreProvider>
    <Page>
      <AppBar />
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
  </StoreProvider>
);

export default App;
