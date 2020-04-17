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

const Styled = styled.div`
  width: 100%;
  min-height: 24px;
  line-height: 24px;
  margin: 0;
  padding: 0.6em;
  width: auto;
  color: ${(props: StyledProps) => (props.selecting ? props.theme.palette.selected : props.theme.palette.onSurface)};
  border-top: 1px solid ${props => props.theme.palette.menu};
  border-bottom: 1px solid ${props => props.theme.palette.menu};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  &:hover {
    border-top: 1px solid ${props => props.theme.palette.onPrimary};
    border-bottom: 1px solid ${props => props.theme.palette.onPrimary};
    color: ${props => props.theme.palette.onPrimary};
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
