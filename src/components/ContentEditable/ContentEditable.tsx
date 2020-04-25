/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { KeyboardEvent, FunctionComponent, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const Styled = styled.div`
  width: 100%;
  min-height: 64px;
  padding: 0.6em;
`;

const Cell: FunctionComponent<Props> = ({ value, onChange }) => {
  const cellRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // setCell
  }, []);
  const handleClick = () => {
    // TODO
  };
  const handleBlur = () => {
    if (cellRef.current) onChange(cellRef.current.innerText);
  };
  const handleKey = (e: KeyboardEvent) => {
    const { keyCode } = e;
    if (keyCode === 27) {
      if (cellRef.current) onChange(cellRef.current.innerText);
    } else {
      return;
    }
    e.preventDefault();
  };
  const handleInput = () => {
    // if (cellRef.current) setCellValue(cellRef.current.innerText);
  };
  return (
    <Styled
      role='button'
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={handleKey}
      onBlur={handleBlur}
      tabIndex={0}
      contentEditable
      ref={cellRef}
      suppressContentEditableWarning
      data-testid='contenteditable'
    >
      {value}
    </Styled>
  );
};

export default Cell;
