/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { BasicTheme } from '../../themes';

type StyleProps = {
  size?: number;
  color?: string;
  hover?: string;
  theme: DefaultTheme;
};

const Button = styled.button`
  height: ${(props) => props.theme.spacing.iconSize}px;
  line-height: 1;
  background: transparent;
  border: 0px;
  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.color ? props.color : props.disabled ? props.theme.palette.disabled : props.theme.palette.surface};
  cursor: pointer;
  & > svg {
    width: ${(props: StyleProps) => props.size || props.theme.spacing.iconSize}px;
    height: ${(props: StyleProps) => props.size || props.theme.spacing.iconSize}px;
  }
  &:hover {
    color: ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      props.hover ? props.hover : props.disabled ? props.theme.palette.disabled : 'white'};
  }
`;
Button.defaultProps = { theme: BasicTheme };

interface IconButtonProps {
  icon: StyledIcon;
  size?: number;
  disabled?: boolean;
  color?: string;
  hover?: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const IconButton: FunctionComponent<IconButtonProps> = ({
  icon: Icon,
  size,
  disabled = false,
  color,
  hover,
  onClick,
  children,
}) => {
  const onC = disabled ? undefined : onClick;
  return (
    <Button onClick={onC} disabled={disabled} size={size} color={color} hover={hover}>
      <Icon />
      {children && <span>{children}</span>}
    </Button>
  );
};

export { IconButton };
