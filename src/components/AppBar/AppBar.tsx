/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import { StateType } from '../../types';
import { BasicTheme } from '../../themes';

interface StyledProps {
  noDrawer?: boolean;
  theme: DefaultTheme;
}

const Styled = styled.header`
  position: fixed;
  top: 0px;
  left: ${(props: StyledProps) =>
    props.theme.spacing.fullHeightDrawer && !props.noDrawer ? props.theme.spacing.drawerWidth : '0'}px;
  z-index: 3;
  width: ${props =>
    props.theme.spacing.fullHeightDrawer && !props.noDrawer
      ? `calc(100% - ${props.theme.spacing.drawerWidth}px)`
      : '100%'};
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
Styled.defaultProps = { theme: BasicTheme };

const AppBar: FunctionComponent<{ noDrawer?: boolean; title?: string }> = ({ noDrawer, title: _title, children }) => {
  const title = _title || useSelector((state: StateType) => state.title);
  return (
    <Styled noDrawer={noDrawer} data-testid='appbar'>
      {title}
      {children}
    </Styled>
  );
};

export default AppBar;
