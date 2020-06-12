/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Page from '../Page';

const contentBase = process.env.CONTENT_BASE || '';

const Styled = styled.div`
  body: {
    height: default;
  }
  text-align: center;
  width: 100%;
  & > h1 {
    margin-top: 20%;
  }
`;

const PageError: FunctionComponent<{ code: 404; description: string }> = ({ code, description }) => (
  <Page>
    <Styled>
      <h1>{code}</h1>
      <div>{description}</div>
      <Link to={`${contentBase}/p/jtyper`}>Jtyper</Link>
    </Styled>
  </Page>
);

export default PageError;
