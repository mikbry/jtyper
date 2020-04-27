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
import { BasicTheme } from '../../themes';

interface Props {
  selected?: boolean;
  editable?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onChange: (value: string) => void;
  children: string;
  format?: string;
}

interface StyledProps {
  selected?: boolean;
  editable?: boolean;
  selecting?: boolean;
  theme: DefaultTheme;
}

const chooseBorderColor = (props: StyledProps, hover = false) => {
  if (props.selected) return props.theme.palette.secondary;
  if (props.editable && hover) return props.theme.palette.surface;
  return props.theme.palette.notebook;
};

const Styled = styled.div`
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  width: auto;
  border: 1px solid ${(props: StyledProps) => chooseBorderColor(props)};

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  &:hover {
    border: 1px solid ${props => chooseBorderColor(props, true)};
  }
  &:hover > aside {
    border-left: 4px solid ${props => chooseBorderColor(props, true)};
  }

  &:focus {
    outline: none !important;
  }

  & > span {
    padding: 0.6em;
  }
`;
Styled.defaultProps = { theme: BasicTheme };

const Prompt = styled.aside`
  width: 92px;
  padding: 4px;
  border-left: 4px solid ${(props: StyledProps) => chooseBorderColor(props, true)};
  text-align: right;
  font-size: 13px;
  font-familiy: 13px;
`;
Prompt.defaultProps = { theme: BasicTheme };

const RawContent = styled.div`
  min-height: calc(32px - 1.2em);
  padding: 0.6em 0;
`;

const Cell: FunctionComponent<Props> = ({
  selected = false,
  editable = false,
  format = undefined,
  onClick,
  onChange,
  children,
}) => {
  const cellRef = useRef<HTMLInputElement>(null);
  const value = children;
  useEffect(() => {
    // setCell
  }, []);
  const handleBlur = () => {
    //  if (cellRef.current) onChange(cellRef.current.innerText);
  };
  const handleKey = (/* e: KeyboardEvent */) => {
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
      selected && editable ? (
        <ContentEditable value={value} onChange={onChange} />
      ) : (
        <RawContent data-testid='rawcontent'>{value}</RawContent>
      );
  }

  return (
    <Styled
      role='button'
      selected={selected}
      editable={editable}
      onClick={onClick}
      onKeyDown={handleKey}
      onBlur={handleBlur}
      tabIndex={0}
      selecting={selected}
      ref={cellRef}
      suppressContentEditableWarning
    >
      <Prompt selected={selected}>{format === 'code' && `In [${'   '}] :`}</Prompt>
      {content}
    </Styled>
  );
};

export default Cell;
