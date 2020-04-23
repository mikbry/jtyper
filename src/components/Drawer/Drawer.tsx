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

const Wrapper = styled.div`
  position: fixed;
  top: ${props => (props.theme.spacing.fullHeightDrawer ? '0' : props.theme.spacing.headerHeight)}px;
  min-width: ${props => props.theme.spacing.drawerWidth}px;
  min-height: ${props =>
    props.theme.spacing.fullHeightDrawer ? '100%' : `calc(100% - ${props.theme.spacing.headerHeight}px)`};
  color: ${props => props.theme.palette.onSurface};
  background: ${props => props.theme.palette.menu};
`;

const Drawer: FunctionComponent = ({ children }) => <Wrapper>{children}</Wrapper>;
export default Drawer;
