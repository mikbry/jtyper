/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { BasicTheme } from '../../themes';

interface StyledProps {
  theme: DefaultTheme;
}

const Background = styled.div`
  position: fixed;
  z-index: 10;
  background-color: ${(props: StyledProps) => props.theme.palette.backgroundModal};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 11;
  background-color: ${(props: StyledProps) => props.theme.palette.background};
  width: 50%;
  border: 1px solid ${(props: StyledProps) => props.theme.palette.dividerOnLight};
  box-shadow: ${(props: StyledProps) => props.theme.shadow};
  padding: 16px;
  top: 30%;
  left: 25%;
  box-sizing: border-box;
`;
Wrapper.defaultProps = { theme: BasicTheme };

const Modal: FunctionComponent<{ onClose?: Function }> = ({ children, onClose }) => (
  <Background
    onClick={() => {
      if (onClose) {
        onClose();
      }
    }}
  >
    <Wrapper
      onClick={event => {
        event.stopPropagation();
      }}
    >
      {children}
    </Wrapper>
  </Background>
);
export default Modal;
