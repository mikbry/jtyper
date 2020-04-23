/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import { UnControlled as CodeMirror2 } from 'react-codemirror2';
import '../../styles/codemirror/theme/ayu-dark.css';
import '../../styles/codemirror/codemirror.css';
import '../../styles/code.css';

type Props = {
  value: string;
  language: string;
  onChange: Function;
};

const modes: Record<string, string> = {
  javascript: 'javascript',
  markdown: 'text/x-markdown',
};
const Editor: FunctionComponent<Props> = ({ value, language, onChange }) => {
  const mode = modes[language];
  return (
    <CodeMirror2
      value={value}
      detach
      options={{
        mode,
        lineNumbers: true,
      }}
      onChange={(_editor, _data, newValue) => {
        if (onChange) onChange(newValue);
      }}
    />
  );
};

export default Editor;