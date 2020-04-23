/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-it';

type Props = { value: string };

const Styled = styled.div`
  padding: 0.6em;
`;

const render = (markdown: Markdown, current: HTMLDivElement | null, value: string) => {
  if (current) {
    // eslint-disable-next-line no-param-reassign
    current.innerHTML = markdown.render(value);
  }
};

const SyntaxHighlighter: FunctionComponent<Props> = ({ value }) => {
  const ref = useRef<HTMLDivElement>(null);
  let markdown: Markdown | undefined;
  useEffect(() => {
    if (!markdown) {
      markdown = new Markdown();
    }
    render(markdown, ref.current, value);
    return () => {
      markdown = undefined;
    };
  }, [value]);
  return <Styled ref={ref}>{value}</Styled>;
};

export default SyntaxHighlighter;
