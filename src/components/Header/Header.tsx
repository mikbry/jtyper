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
import { useSelector } from 'react-redux';
import { StateType } from '../../types';
import { BasicTheme } from '../../themes';

const Styled = styled.header`
  width: ${(props) => props.theme.spacing.drawerWidth}px;
  padding-left: 0.6em;
  color: ${(props) => props.theme.palette.onPrimary};
  font-size: 1.25em;
  line-height: ${(props) => props.theme.spacing.headerHeight}px;
  min-height: ${(props) => props.theme.spacing.headerHeight * 2}px;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;
Styled.defaultProps = { theme: BasicTheme };

const Icon = styled(Book)`
  width: 24px;
  margin-right: 0.6em;
`;

const Header: FunctionComponent = () => {
  const document = useSelector((state: StateType) => state.document);
  return (
    <Styled>
      <Icon />
      {document.title}
    </Styled>
  );
};

export default Header;
