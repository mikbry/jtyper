/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components';

const Cell = styled.div`
  width: 100%;
  min-height: 64px;
  margin: 0;
  padding: 0.6em;
  width: auto;
  border: 1px solid ${props => props.theme.palette.background};

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  &:hover {
    border: 1px solid ${props => props.theme.palette.surface};
  }
`;

export default Cell;
