/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { BasicTheme } from '../../themes';

export type OptionType = {
  key: string;
  value: string;
  selected?: boolean;
};

interface Props {
  disabled?: boolean;
  open?: boolean;
  placeholder?: string;
  options: Array<OptionType>;
  onChange: Function;
}

interface StyledProps {
  disabled?: boolean;
  open?: boolean;
  theme: DefaultTheme;
}

const Wrapper = styled.div`
  color: ${(props: StyledProps) =>
    // eslint-disable-next-line no-nested-ternary
    props.open
      ? props.theme.palette.selected
      : props.disabled
      ? props.theme.palette.disabled
      : props.theme.palette.surface};
  border: 1px solid ${(props: StyledProps) => props.theme.palette.group};
  top: 0;
  padding: 0 16px;
  margin: 4px;
  font-size: 0.8em;
  height: 36px;
  line-height: 36px;
  width: 96px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  text-align: center;

  &:hover {
    color: ${props => (props.disabled ? props.theme.palette.surface : 'white')};
  }

  & > ul {
    list-style: none;
    padding: 0.6em;
    margin: 0;
    position: absolute;
    background: ${(props: StyledProps) => props.theme.palette.menu};
    border: ${(props: StyledProps) => props.theme.palette.menu};
    left: -1px;
    top: 38px;
    width: 100%;
    display: ${(props: StyledProps) => (props.open ? 'inline-block' : 'none')};
  }
`;
Wrapper.defaultProps = { theme: BasicTheme };

interface ItemProps {
  selecting?: boolean;
  theme: DefaultTheme;
}

const Item = styled.li`
  color: ${(props: ItemProps) => (props.selecting ? props.theme.palette.selected : props.theme.palette.onSurface)};

  &:hover {
    color: white;
  }
`;
Item.defaultProps = { theme: BasicTheme };

const Select: FunctionComponent<Props> = ({ options, disabled, open: o = false, placeholder, onChange }) => {
  const [open, setOpen] = useState(o);
  const onOpen = () => {
    if (!disabled) setOpen(!open);
  };
  const onClose = () => {
    if (open) setOpen(false);
  };
  const selected = options.find(item => item.selected);
  return (
    <Wrapper
      role='button'
      onKeyPress={() => {
        /* TODO */
      }}
      tabIndex={0}
      open={open}
      disabled={disabled}
      onClick={onOpen}
      onBlur={onClose}
    >
      {selected ? selected.value : placeholder}
      <ul>
        {options.map(option => (
          <Item
            key={option.key}
            selecting={option.selected}
            onClick={() => {
              if (!option.selected) {
                onChange(option.value, option.key);
              }
            }}
            data-testid='item'
          >
            {option.value}
          </Item>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Select;
