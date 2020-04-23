/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';
import Highlighter from 'react-codemirror-runmode';
import '../../styles/codemirror/theme/ayu-dark.css';
import '../../styles/codemirror/codemirror.css';
import '../../styles/code.css';

type Props = {
  value: string;
};

const CodeHighlighter: FunctionComponent<Props> = ({ value }) => (
  <Highlighter
    style={{ margin: '0', minHeight: '64px', height: '100%' }}
    className='CodeMirror cm-s-default jtyper-code'
    codeMirror={CodeMirror}
    theme='ayu-dark'
    value={value}
    language='javascript'
  />
);

export default CodeHighlighter;
