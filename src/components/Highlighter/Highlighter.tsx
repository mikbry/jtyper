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

const markdown = new Markdown();

const SyntaxHighlighter: FunctionComponent<Props> = ({ value }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    /* istanbul ignore else */
    if (ref.current) ref.current.innerHTML = markdown.render(value);
    return () => {
      //
    };
  }, [value]);
  return (
    <Styled ref={ref} data-testid='highlighter'>
      {value}
    </Styled>
  );
};

export default SyntaxHighlighter;
