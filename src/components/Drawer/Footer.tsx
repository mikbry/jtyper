/* eslint-disable no-unused-vars */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BasicTheme } from '../../themes';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  line-height: 20px;
  height: 20px;
  padding: 0.6em;
  display: flex;
  font-size: 12px;
  color: ${props => props.theme.palette.disabled};

  & > a {
    color: ${props => props.theme.palette.disabled};
  }
  & > a:hover {
    color: ${props => props.theme.palette.onPrimary};
  }
`;
Wrapper.defaultProps = { theme: BasicTheme };

const Footer: FunctionComponent = ({ children }) => <Wrapper>{children}</Wrapper>;
export default Footer;
