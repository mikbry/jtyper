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
  position: fixed;
  top: ${props => (props.theme.spacing.fullHeightDrawer ? '0' : props.theme.spacing.headerHeight)}px;
  width: ${props => props.theme.spacing.drawerWidth}px;
  min-height: ${props =>
    props.theme.spacing.fullHeightDrawer ? '100%' : `calc(100% - ${props.theme.spacing.headerHeight}px)`};
  color: ${props => props.theme.palette.onSurface};
  background: ${props => props.theme.palette.menu};
`;
Wrapper.defaultProps = { theme: BasicTheme };

const Drawer: FunctionComponent = ({ children }) => <Wrapper data-testid='drawer'>{children}</Wrapper>;
export default Drawer;
