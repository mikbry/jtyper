/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import codeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';
import '../../styles/codemirror/theme/ayu-dark.css';
import '../../styles/codemirror/codemirror.css';
import '../../styles/code.css';

type Props = {
  value: string;
};

const CodeHighlighter: FunctionComponent<Props> = ({ value }) => {
  const elements: JSX.Element[] = [];
  let index = 0;
  let lastStyle = '';
  let tokenBuf = '';
  const prefix = 'cm-';
  const pushElement = (token: string, style: string) => {
    elements.push(
      <span className={style ? prefix + style : ''} key={`i_${index}`}>
        {token}
      </span>,
    );
    index += 1;
  };
  const mode = 'text/javascript';
  codeMirror.runMode(value, mode, (token, style) => {
    if (lastStyle === style) {
      tokenBuf += token;
      lastStyle = style;
    } else {
      if (tokenBuf) {
        pushElement(tokenBuf, lastStyle);
      }
      tokenBuf = token;
      lastStyle = style as string;
    }
  });
  pushElement(tokenBuf, lastStyle);

  const code = <code>{elements}</code>;
  return <pre className='CodeMirror cm-s-default jtyper-code'>{code}</pre>;
};

export default CodeHighlighter;
