/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components';

const Explorer = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.headerHeight}px;
  width: ${props => props.theme.spacing.explorerWidth}px;
  height: calc(100% - ${props => props.theme.spacing.headerHeight}px);
  color: ${props => props.theme.palette.onSurface};
  background: ${props => props.theme.palette.surface};
`;

export default Explorer;
