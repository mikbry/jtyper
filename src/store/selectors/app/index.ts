/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ProjectType, NotebookType } from '../../../types';

export const getCurrentNotebook = (project: ProjectType | undefined): NotebookType | undefined => {
  let notebook;
  if (project && project.selected !== undefined) {
    notebook = project.files[project.selected];
  }
  return notebook;
};
