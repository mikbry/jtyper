/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { DefaultTheme } from 'styled-components';
import { BasicTheme } from '../../themes';

interface StyledProps {
  noDrawer?: boolean;
  theme: DefaultTheme;
}

const Container = styled.div`
  position: absolute;
  top: ${(props: StyledProps) => props.theme.spacing.headerHeight}px;
  left: 50%;
  transform: translate(calc(-50% + ${(props) => (props.noDrawer ? 0 : props.theme.spacing.drawerWidth / 2)}px), 0);
`;
Container.defaultProps = { theme: BasicTheme, noDrawer: false };

export default Container;
