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

const Modal = styled.div`
  position: fixed;
  z-index: 10;
  background-color: ${(props: StyledProps) => props.theme.palette.background};
  width: 50%;
  border: 1px solid ${(props: StyledProps) => props.theme.palette.dividerOnLight};
  box-shadow: ${(props: StyledProps) => props.theme.shadow};
  padding: 16px;
  left: 25%;
  top: 30%;
  box-sizing: border-box;
`;
Modal.defaultProps = { theme: BasicTheme };

export default Modal;
