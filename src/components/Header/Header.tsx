/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Book } from '@styled-icons/icomoon/Book';
import { useStore } from '../../store';
import Toolbar from '../Toolbar';

const Styled = styled.header`
  position: fixed;
  z-index: 3;
  width: 100%;
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

const Icon = styled(Book)`
  width: 24px;
  margin-right: 0.6em;
`;

const Header: FunctionComponent = () => {
  const { project } = useStore();
  return (
    <Styled>
      <Icon />
      jtyper : {project?.title || 'undefined'}
      <Toolbar />
    </Styled>
  );
};

export default Header;
