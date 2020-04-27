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
  padding: 0;
`;

const render = (ref: React.RefObject<HTMLDivElement>, value: string, m: Markdown | undefined): Markdown | undefined => {
  const { current } = ref;
  let markdown = m;
  if (current && !markdown) {
    markdown = new Markdown();
  }
  if (current && markdown) current.innerHTML = markdown.render(value);
  return markdown;
};

const SyntaxHighlighter: FunctionComponent<Props> = ({ value }) => {
  const ref = useRef<HTMLDivElement>(null);
  let markdown: Markdown | undefined = render(ref, value, undefined);
  useEffect(() => {
    markdown = render(ref, value, markdown);
    return () => {
      markdown = undefined;
    };
  }, [value]);
  return (
    <Styled ref={ref} data-testid='highlighter'>
      {value}
    </Styled>
  );
};

export default SyntaxHighlighter;
