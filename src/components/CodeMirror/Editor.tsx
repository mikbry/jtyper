/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent, useState } from 'react';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import { UnControlled as CodeMirror2 } from 'react-codemirror2';
import '../../styles/codemirror/theme/ayu-dark.css';
import '../../styles/codemirror/codemirror.css';
import '../../styles/code.css';

type Props = {
  value: string;
  language: string;
  onChange: Function;
  focus: boolean;
};

const modes: Record<string, string> = {
  javascript: 'text/javascript',
  markdown: 'text/x-markdown',
  raw: 'null',
};

const Editor: FunctionComponent<Props> = ({ value: defaultValue, language, onChange }) => {
  const [value] = useState(defaultValue);
  const mode = modes[language];
  return (
    <CodeMirror2
      value={value}
      autoScroll={false}
      options={{
        lineNumbers: false,
        mode,
        scrollbarStyle: 'null',
      }}
      editorDidMount={editor => {
        // Very hard to create a use case for this so we ignore for now
        /* istanbul ignore next */
        if (!editor.hasFocus) {
          editor.focus();
        }
      }}
      onChange={(_editor, _data, newValue) => {
        onChange(newValue);
      }}
    />
  );
};

export default Editor;
