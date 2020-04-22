/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';

type Option = {
  key: string;
  value: string;
  selected?: boolean;
};

interface Props {
  disabled?: boolean;
  placeholder?: string;
  options: Array<Option>;
  onChange: Function;
}

interface StyledProps {
  disabled?: boolean;
  open?: boolean;
  theme: DefaultTheme;
}

const Wrapper = styled.div`
  color: ${(props: StyledProps) => (props.open ? props.theme.palette.selected : props.theme.palette.surface)};
  border: 1px solid ${(props: StyledProps) => props.theme.palette.group};
  top: 0;
  padding: 0 16px;
  margin: 4px;
  font-size: 0.8em;
  height: 36px;
  line-height: 36px;
  height: 38px;
  display: inline-block;
  cursor: pointer;
  position: relative;

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

const Select: FunctionComponent<Props> = ({ options, disabled, placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
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
          >
            {option.value}
          </Item>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Select;
