/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from '../../components/Page';
import AppBar from '../../components/AppBar';
import Container from '../../components/Container';
import Notebook from '../../components/Notebook';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Publication: FunctionComponent = () => (
  // const { publisher, publicationId } = useParams();
  <Page>
    <AppBar />
    <Wrapper>
      <Container>
        <Notebook />
      </Container>
    </Wrapper>
  </Page>
);

export default Publication;
