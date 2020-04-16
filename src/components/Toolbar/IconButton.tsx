/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';

const Button = styled.button`
  height: 30px;
  line-height: 1;
  background: transparent;
  border: 0px;
  margin: 3px;
  color: ${props => props.theme.palette.surface};
  cursor: pointer;
  & > svg {
    width: 30px;
    height: 30px;
  }
  &:hover {
    color: white;
  }
`;

interface IconButtonProps {
  icon: StyledIcon;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const IconButton: FunctionComponent<IconButtonProps> = ({ icon: Icon, onClick, children }) => (
  <Button onClick={onClick}>
    <Icon />
    {children && <span>{children}</span>}
  </Button>
);

export default IconButton;
