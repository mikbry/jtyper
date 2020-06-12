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
  theme: DefaultTheme;
}

const Input = styled.input`
  font-size: 1em;
  padding: 0.3em 1em;
  border-radius: 3px;
  color: ${props => props.theme.palette.text};
  border: 1px solid ${(props: StyledProps) => props.theme.palette.dividerOnLight};
`;
Input.defaultProps = { theme: BasicTheme };

export default Input;
