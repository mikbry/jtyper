/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent, useEffect, useRef } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Highlighter from '../Highlighter';
import { CodeHighlighter, Editor } from '../CodeMirror';
import { BasicTheme } from '../../themes';
import { LogEntryType, CellState } from '../../types';
import Action from './Action';

interface Props {
  selected?: boolean;
  edited?: boolean;
  editable?: boolean;
  state?: CellState;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onChange: (value: string) => void;
  onRun: () => void;
  children: string;
  format?: string;
  out?: LogEntryType[];
}

interface StyledProps {
  selected?: boolean;
  edited?: boolean;
  editable?: boolean;
  selecting?: boolean;
  theme: DefaultTheme;
}

const chooseBorderColor = (props: StyledProps, hover = false, defaultColor = props.theme.palette.notebook) => {
  if (props.selected && props.edited) return props.theme.palette.secondary;
  if (props.selected) return props.theme.palette.surface;
  if (props.editable && hover) return props.theme.palette.surface;
  return defaultColor;
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
    border: 1px solid ${(props) => chooseBorderColor(props, true)};
  }
  &:hover > div:first-child aside {
    border-left: 8px solid ${(props) => chooseBorderColor(props, true)};
  }

  &:focus {
    outline: none !important;
  }
`;

Styled.defaultProps = { theme: BasicTheme };

const Prompt = styled.aside`
  width: 33.5px;
  max-height: 48px;
  padding: 4px;
  border-left: 8px solid ${(props: StyledProps) => chooseBorderColor(props, true)};
  text-align: right;
  font-size: 13px;
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
  border-bottom: 1px solid ${(props) => props.theme.palette.dividerOnLight};
`;
OutText.defaultProps = { theme: BasicTheme };

const OutError = styled.div`
  padding: 4px 0;
  color: red;
  border-bottom: 1px solid ${(props) => props.theme.palette.dividerOnLight};
`;
OutError.defaultProps = { theme: BasicTheme };

const Cell: FunctionComponent<Props> = ({
  selected = false,
  edited = false,
  editable = false,
  format = undefined,
  out = undefined,
  state,
  onClick,
  onChange,
  onRun,
  children,
}) => {
  const cellRef = useRef<HTMLInputElement>(null);
  const value = children;
  const scrollIntoCell = () => {
    if (selected && cellRef.current) {
      cellRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };
  scrollIntoCell();
  useEffect(() => {
    scrollIntoCell();
  });
  const handleBlur = () => {
    //  if (cellRef.current) onChange(cellRef.current.innerText);
  };
  let content = <>{value}</>;
  if (format === 'markdown') {
    content =
      selected && edited && editable ? (
        <Editor value={value} onChange={onChange} language='markdown' focus />
      ) : (
        <Highlighter value={value} />
      );
  } else if (format === 'code') {
    content =
      selected && edited && editable ? (
        <Editor value={value} onChange={onChange} language='javascript' focus />
      ) : (
        <CodeHighlighter value={value} />
      );
  } else {
    content =
      selected && edited && editable ? (
        <Editor value={value} onChange={onChange} language='raw' focus />
      ) : (
        <RawContent data-testid='rawcontent'>{value}</RawContent>
      );
  }

  return (
    <Styled
      role='button'
      data-testid='cell'
      selected={selected}
      edited={edited}
      editable={editable}
      onClick={onClick}
      onBlur={handleBlur}
      tabIndex={0}
      selecting={selected}
      ref={cellRef}
      suppressContentEditableWarning
    >
      <Line selected={selected} edited={edited}>
        <Prompt selected={selected} edited={edited}>
          {format === 'code' && (
            <Action
              state={state}
              onAction={onRun}
              selectionColor={chooseBorderColor(
                { selected, editable, edited, theme: BasicTheme },
                true,
                BasicTheme.palette.onSurface,
              )}
            />
          )}
        </Prompt>
        {content}
      </Line>
      <Line selected={false}>
        <Prompt selected={false} />
        <OutContent>
          {out &&
            (out.length
              ? out.map((o) => {
                  if (o.type === 'error') {
                    return <OutError key={o.id}>{o.text}</OutError>;
                  }
                  return <OutText key={o.id}>{o.text}</OutText>;
                })
              : '_')}
        </OutContent>
      </Line>
    </Styled>
  );
};

export default Cell;
