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
import Header from './components/Header';
import Explorer from './components/Explorer';
import Container from './components/Container';
import Notebook from './components/Notebook';
import Item from './components/Item';
import Cell from './components/Cell';
import Toolbar from './components/Toolbar';

const Wrapper = styled.div`
  display: flex;
`;

const Icon = styled.span`
  margin-right: 0.6em;
`;

const App: FunctionComponent = () => (
  <StoreProvider>
    <Page>
      <Header>
        <Icon role='img' aria-label='notebook'>
          📒
        </Icon>
        jtyper : notebook
        <Toolbar />
      </Header>
      <Wrapper>
        <Explorer>
          <Item>Welcome</Item>
        </Explorer>
        <Container>
          <Notebook>
            <Cell>Header</Cell>
            <Cell>lorem ipsum</Cell>
            <Cell>console.log(&apos;hello world&apos;)</Cell>
          </Notebook>
        </Container>
      </Wrapper>
    </Page>
  </StoreProvider>
);

export default App;
