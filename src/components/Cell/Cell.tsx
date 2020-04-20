/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { KeyboardEvent, FunctionComponent, useState, useEffect, useRef } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Highlighter from '../Highlighter';

interface Props {
  selected?: boolean;
  editable?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onChange?: (value: string) => void;
  value?: string;
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
  border: 1px solid
    ${(props: StyledProps) => (props.selected ? props.theme.palette.secondary : props.theme.palette.background)};

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  &:hover {
    border: 1px solid ${props => (props.editable ? props.theme.palette.surface : props.theme.palette.background)};
  }

  &:focus {
    outline: none !important;
  }
`;

const Cell: FunctionComponent<Props> = ({
  selected = false,
  editable = false,
  value = '',
  onClick,
  onChange = () => {
    /* */
  },
}) => {
  // const [cellValue, setCellValue] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const prevVal = useRef<string>();
  const cellRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // setCell
  }, []);
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // TODO
    e.preventDefault();
    if (editable) {
      setEditMode(true);
      if (cellRef.current) {
        prevVal.current = cellRef.current.innerText;
      }
    }
    onClick(e);
  };
  const handleBlur = () => {
    if (cellRef.current) onChange(cellRef.current.innerText);
  };
  const handleKey = (e: KeyboardEvent) => {
    // TODO
    if (editMode) {
      const { keyCode } = e;
      if (keyCode === 27) {
        setEditMode(false);
        if (cellRef.current) onChange(cellRef.current.innerText);
      } else {
        return;
      }
      e.preventDefault();
    }
  };
  const handleInput = () => {
    // if (cellRef.current) setCellValue(cellRef.current.innerText);
  };
  return (
    <Styled
      role='button'
      selected={selected}
      editable={editable}
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={handleKey}
      onBlur={handleBlur}
      tabIndex={0}
      selecting={selected}
      contentEditable={editMode}
      ref={cellRef}
      suppressContentEditableWarning
    >
      {selected ? value : <Highlighter value={value} />}
    </Styled>
  );
};

export default Cell;
