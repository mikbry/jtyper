/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EditorType, NotebookType } from '../../../types';

export const getCurrentNotebook = (editor: EditorType, files: Array<NotebookType>): NotebookType | undefined => {
  let notebook;
  if (editor.selected !== undefined) {
    notebook = files[editor.selected];
  }
  return notebook;
};
