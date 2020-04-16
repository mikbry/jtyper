/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components';

const Header = styled.header`
  color: ${props => props.theme.palette.onPrimary};
  font-size: 1.25em;
  line-height: ${props => props.theme.spacing.headerHeight}px;
  background: ${props => props.theme.palette.primary};
  min-height: ${props => props.theme.spacing.headerHeight}px;
  padding-left: 0.6em;
  padding-right: 0.3em;
  display: flex;
  & > button {
    align-self: flex-end;
    line-height: 24px;
  }
  & > h6 {
    color: white;
    flex-grow: 1;
    margin: 0;
    padding: 0;
    text-align: left;
  }
`;

export default Header;
