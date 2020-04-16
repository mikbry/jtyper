/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components';

const Item = styled.div`
  width: 100%;
  min-height: 24px;
  line-height: 24px;
  margin: 0;
  padding: 0.6em;
  width: auto;
  border: 1px solid ${props => props.theme.palette.surface};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  &:hover {
    border: 1px solid ${props => props.theme.palette.primary};
    color: ${props => props.theme.palette.primary};
  }
`;

export default Item;
