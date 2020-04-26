/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components';
import { BasicTheme } from '../../themes';

const Container = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.headerHeight}px;
  left: 50%;
  transform: translate(calc(-50% + ${props => props.theme.spacing.drawerWidth / 2}px), 0);
  height: calc(100% - 48px);
`;
Container.defaultProps = { theme: BasicTheme };

export default Container;
