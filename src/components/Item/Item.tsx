/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled, { DefaultTheme } from 'styled-components';

interface Props {
  selected?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

interface StyledProps extends Props {
  selecting?: boolean;
  theme: DefaultTheme;
}

const Styled = styled.ul`
  width: 100%;
  min-height: 24px;
  line-height: 24px;
  margin: 0;
  padding: 0.6em;
  width: auto;
  color: ${(props: StyledProps) => (props.selecting ? props.theme.palette.onSelected : props.theme.palette.onSurface)};
  background: ${(props: StyledProps) => (props.selecting ? props.theme.palette.selected : 'inherit')};
  border-top: 1px solid ${props => props.theme.palette.menu};
  border-bottom: 1px solid ${props => props.theme.palette.menu};
  cursor: pointer;

  &:hover {
    border-top: 1px solid ${props => props.theme.palette.menu};
    border-bottom: 1px solid ${props => props.theme.palette.menu};
    background: ${props => props.theme.palette.hover};
    color: ${props => props.theme.palette.onHover};
  }

  &:focus {
    outline: none !important;
  }
`;

const Item: FunctionComponent<Props> = ({ selected, children, onClick }) => (
  <Styled
    role='button'
    onKeyPress={() => {
      /* TODO */
    }}
    onClick={onClick}
    tabIndex={0}
    selecting={selected}
  >
    {children}
  </Styled>
);

export default Item;
