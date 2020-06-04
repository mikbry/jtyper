/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under private license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Page from '../../components/Page';
import AppBar from '../../components/AppBar';
import Container from '../../components/Container';
import Notebook from '../../components/Notebook';
import { StateType } from '../../types';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Publication: FunctionComponent = () => {
  const [publisher] = useSelector((state: StateType) => [state.publisher]);
  return (
    <Page>
      <AppBar noDrawer title={publisher.name} />
      <Wrapper>
        <Container noDrawer>
          <Notebook />
        </Container>
      </Wrapper>
    </Page>
  );
};

export default Publication;
