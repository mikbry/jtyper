/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import AppBar from '../../components/AppBar';
import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Container from '../../components/Container';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const contentBase = process.env.CONTENT_BASE || '';

const Home: FunctionComponent = () => (
  <Page>
    <AppBar />
    <Wrapper>
      <Drawer>
        <Header />
      </Drawer>
      <Container>
        <div>Welcome to JTyper</div>
        <Link to={`${contentBase}/p/jtyper`}>Project demo</Link>
      </Container>
    </Wrapper>
  </Page>
);

export default Home;
