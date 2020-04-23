/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';

const useCodemirror = ({ language = 'javascript', theme }) => {
  if (language !== 'javascript') {
    // TODO import
  }
  return { CodeMirror, theme, language };
};

export default useCodemirror;
