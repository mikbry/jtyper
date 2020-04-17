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
  min-height: 64px;
  margin: 0;
  padding: 0.6em;
  width: auto;
  border: 1px solid ${(props: StyledProps) => props.theme.palette.background};

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  &:hover {
    border: 1px solid ${props => props.theme.palette.surface};
  }

  &:focus {
    outline: none !important;
  }
`;

const Cell: FunctionComponent<Props> = ({ selected, children, onClick }) => (
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

export default Cell;
