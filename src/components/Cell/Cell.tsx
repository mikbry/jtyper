/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { /* KeyboardEvent, */ FunctionComponent, /* useState, */ useEffect, useRef } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Highlighter from '../Highlighter';
import { CodeHighlighter, Editor } from '../CodeMirror';
import ContentEditable from '../ContentEditable';

interface Props {
  selected?: boolean;
  editable?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onChange?: (value: string) => void;
  value?: string;
  format?: string;
}

interface StyledProps extends Props {
  selecting?: boolean;
  theme: DefaultTheme;
}

const Styled = styled.div`
  width: 100%;
  min-height: 64px;
  margin: 0;
  padding: 0;
  width: auto;
  border: 1px solid
    ${(props: StyledProps) => (props.selected ? props.theme.palette.surface : props.theme.palette.notebook)};

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  &:hover {
    border: 1px solid ${props => (props.editable ? props.theme.palette.secondary : props.theme.palette.notebook)};
  }

  &:focus {
    outline: none !important;
  }

  & > span {
    padding: 0.6em;
  }
`;

const RawContent = styled.div`
  padding: 0.6em;
`;

const Cell: FunctionComponent<Props> = ({
  selected = false,
  editable = false,
  value = '',
  format = undefined,
  onClick,
  onChange = () => {
    /* */
  },
}) => {
  const cellRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // setCell
  }, []);
  const handleBlur = () => {
    //  if (cellRef.current) onChange(cellRef.current.innerText);
  };
  const handleKey = (/* e: KeyboardEvent */) => {
    //
  };
  const handleInput = () => {
    //
  };
  let content = <>{value}</>;
  if (format === 'markdown') {
    content =
      selected && editable ? (
        <Editor value={value} onChange={onChange} language='markdown' />
      ) : (
        <Highlighter value={value} />
      );
  } else if (format === 'code') {
    content =
      selected && editable ? (
        <Editor value={value} onChange={onChange} language='javascript' />
      ) : (
        <CodeHighlighter value={value} />
      );
  } else {
    content =
      selected && editable ? <ContentEditable value={value} onChange={onChange} /> : <RawContent>{value}</RawContent>;
  }
  return (
    <Styled
      role='button'
      selected={selected}
      editable={editable}
      onInput={handleInput}
      onClick={onClick}
      onKeyDown={handleKey}
      onBlur={handleBlur}
      tabIndex={0}
      selecting={selected}
      ref={cellRef}
      suppressContentEditableWarning
    >
      {content}
    </Styled>
  );
};

export default Cell;
