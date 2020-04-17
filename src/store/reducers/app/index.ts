/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { APP, INITIALIZE, DONE } from '../../../constants';
import { StateType, ProjectType, NotebookType } from '../../../types';

const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const handlers = {
  [INITIALIZE + DONE]: (state: StateType, action: { project: ProjectType }) => {
    let { project } = action;
    if (!project) {
      ({ project } = state);
    }
    return { ...state, project, init: true };
  },
  [APP.SETTITLE + DONE]: (state: StateType, action: { title: string }) => {
    const { title } = action;
    return { ...state, project: { title } };
  },
  [APP.CREATENOTEBOOK + DONE]: (state: StateType, action: { title: string }) => {
    let { title } = action;
    const { project } = state;
    const { files } = project;
    if (!title) {
      title = 'Notebook';
      let i = 1;
      const it = (f: NotebookType) => f.title === title || f.name === title;
      while (files.findIndex(it) !== -1) {
        title = `Notebook${i}`;
        i += 1;
      }
    }
    const notebook: NotebookType = {
      id: generateId(),
      title,
      cells: [{ id: generateId(), raw: `# ${title}` }],
      localStorage: true,
    };
    project.selected = files.length;
    files.push(notebook);
    return { ...state, project };
  },
  [APP.SELECTFILE + DONE]: (state: StateType, action: { selected: number }) => {
    const { selected } = action;
    const { project } = state;
    return { ...state, project: { ...project, selected } };
  },
  [APP.SELECTCELL + DONE]: (state: StateType, action: { selected: number }) => {
    const { selected } = action;
    const { project } = state;
    const { files } = project;
    if (selected !== undefined && project.selected) {
      let notebook = files[project.selected];
      notebook = { ...notebook, selectedCell: selected };
      files[project.selected] = notebook;
    }
    return { ...state, project: { files } };
  },
};

export default handlers;
