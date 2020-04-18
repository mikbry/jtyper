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
  height: ${props => props.theme.spacing.iconSize}px;
  line-height: 1;
  background: transparent;
  border: 0px;
  margin: 3px;
  color: ${props => (props.disabled ? props.theme.palette.disabled : props.theme.palette.surface)};
  cursor: pointer;
  & > svg {
    width: ${props => props.theme.spacing.iconSize}px;
    height: ${props => props.theme.spacing.iconSize}px;
  }
  &:hover {
    color: ${props => (props.disabled ? props.theme.palette.disabled : 'white')};
  }
`;

interface IconButtonProps {
  icon: StyledIcon;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const onDummy = () => {
  /* */
};

const IconButton: FunctionComponent<IconButtonProps> = ({ icon: Icon, disabled = false, onClick, children }) => {
  const onC = disabled ? onDummy : onClick;
  return (
    <Button onClick={onC} disabled={disabled}>
      <Icon />
      {children && <span>{children}</span>}
    </Button>
  );
};

export default IconButton;
