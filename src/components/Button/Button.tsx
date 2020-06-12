/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components';
import { BasicTheme } from '../../themes';

const Button = styled('button')`
  font-size: 1em;
  margin: 0.6em;
  padding: 0.3em 1em;
  border-radius: 3px;
  color: ${props => props.theme.palette.secondary};
  border: 2px solid ${props => props.theme.palette.secondary};
  background: none;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.palette.onHover};
    border: 2px solid ${props => props.theme.palette.secondary};
    background: ${props => props.theme.palette.secondary};
  }
`;

Button.defaultProps = {
  theme: BasicTheme,
};

export default Button;
