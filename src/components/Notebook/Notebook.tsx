/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Cell from '../Cell';
import { selectCell, updateCell, useCommands, runCell } from '../../store/actions';
import { getNotebook, getNotebookById } from '../../store/selectors';
import { CellType, StateType, NotebookType, EditorType } from '../../types';
import { BasicTheme } from '../../themes';

const Wrapper = styled.div`
  margin: 0.6em;
  width: 50vw;
  background-color: ${(props) => props.theme.palette.notebook};
  height: calc(100% - ${(props) => props.theme.spacing.headerHeight}px);
`;
Wrapper.defaultProps = { theme: BasicTheme };

const NoContent = styled.div`
  text-align: center;
  height: 400px;
  margin-top: 50%;
`;

const Notebook: FunctionComponent<{ notebookId?: string }> = ({ notebookId }) => {
  const [f, e] = useSelector((state: StateType) => [state.files, state.editor]);
  const files = f as NotebookType[];
  const editor = e as EditorType;
  const dispatch = useDispatch();
  let content;
  let readOnly = true;
  let edited = false;
  let selectedCell = -1;
  const handleSelectCell = (selected: number, mode?: 'edit') => {
    dispatch(selectCell({ selected, mode }));
  };
  const handleCellChange = (index: number, value: string, notebook: NotebookType) => {
    const cell = { ...notebook.cells[index], raw: value };
    dispatch(updateCell(cell));
  };
  const handleRun = (selected: number) => {
    dispatch(runCell({ selected }));
  };
  let notebook: NotebookType | undefined;
  if (notebookId) {
    notebook = getNotebookById(notebookId, files);
  } else {
    notebook = getNotebook(editor.selected, files);
  }
  if (notebook) {
    ({ selectedCell = -1 } = editor);
    edited = editor.mode === 'edit';
    ({ readOnly = false } = notebook);
    const { editCodeOnly } = notebook;
    content = (
      <>
        {notebook.cells.map((cell: CellType, index: number) => (
          <Cell
            key={cell.id}
            format={cell.format}
            out={cell.out}
            edited={edited}
            editable={!readOnly || (editCodeOnly && cell.format === 'code')}
            selected={index === selectedCell}
            state={cell.state}
            onChange={(value) => {
              handleCellChange(index, value, notebook as NotebookType);
            }}
            onClick={() => {
              const mode = !readOnly || (editCodeOnly && cell.format === 'code') ? 'edit' : undefined;
              if (!readOnly || cell.format === 'code') handleSelectCell(index, mode);
            }}
            onRun={() => {
              handleRun(index);
            }}
          >
            {cell.raw}
          </Cell>
        ))}
      </>
    );
  }
  if (!content) {
    content = <NoContent>No content</NoContent>;
  }

  useCommands();

  return <Wrapper>{content}</Wrapper>;
};

export default Notebook;
