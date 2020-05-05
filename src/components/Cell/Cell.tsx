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
import { LogEntryType } from '../../types';

interface Props {
  selected?: boolean;
  editable?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onChange: (value: string) => void;
  children: string;
  format?: string;
  out?: LogEntryType[];
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
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: auto;

  &:not(:last-child) {
    margin-bottom: 1.2em;
  }

  & > div > .react-codemirror2 {
    width: calc(100% - 96px);
    padding: 0px;
  }

  & > div > div {
    width: calc(100% - 96px - 8px);
    padding: 4px;
  }

  & div > pre {
    width: calc(100% - 96px - 8px);
    padding: 4px;
  }

  &:hover > div:first-child > div {
    border: 1px solid ${(props: StyledProps) => chooseBorderColor(props, true)};
  }
  &:hover > div:first-child > pre {
    border: 1px solid ${props => chooseBorderColor(props, true)};
  }
  &:hover > div:first-child aside {
    border-left: 8px solid ${props => chooseBorderColor(props, true)};
  }

  &:focus {
    outline: none !important;
  }
`;

Styled.defaultProps = { theme: BasicTheme };

const Prompt = styled.aside`
  width: 36px;
  max-height: 48px;
  padding: 4px;
  border-left: 8px solid ${(props: StyledProps) => chooseBorderColor(props, true)};
  text-align: right;
  font-size: 13px;
  font-familiy: 13px;
`;
Prompt.defaultProps = { theme: BasicTheme };

const Line = styled.div`
  display: flex;
  & > div {
    border: 1px solid ${(props: StyledProps) => chooseBorderColor(props)};
  }

  & > pre {
    border: 1px solid ${(props: StyledProps) => chooseBorderColor(props)};
  }
`;
Line.defaultProps = { theme: BasicTheme };

const RawContent = styled.div`
  min-height: calc(32px - 1.2em);
  padding: 6px 4px;
`;

const OutContent = styled.div`
  min-height: calc(32px - 1.2em);
  padding: 6px 4px;
  font-size: 13px;
  font-familiy: 13px;
`;

const OutText = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid ${props => props.theme.palette.dividerOnLight};
`;
OutText.defaultProps = { theme: BasicTheme };

const OutError = styled.div`
  padding: 4px 0;
  color: red;
  border-bottom: 1px solid ${props => props.theme.palette.dividerOnLight};
`;
OutError.defaultProps = { theme: BasicTheme };

const Cell: FunctionComponent<Props> = ({
  selected = false,
  editable = false,
  format = undefined,
  out = undefined,
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
      <Line selected={selected}>
        <Prompt selected={selected}>{format === 'code' && `In [${'   '}] :`}</Prompt>
        {content}
      </Line>
      {out?.length && (
        <Line selected={false}>
          <Prompt selected={false} />
          <OutContent>
            {out.map(o => {
              if (o.type === 'error') {
                return <OutError key={o.id}>{o.text}</OutError>;
              }
              return <OutText key={o.id}>{o.text}</OutText>;
            })}
          </OutContent>
        </Line>
      )}
    </Styled>
  );
};

export default Cell;
