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
import { selectCell, updateCell, deleteCell } from '../../store/actions';
import { getNotebook } from '../../store/selectors';
import { CellType, StateType, NotebookType } from '../../types';
import { BasicTheme } from '../../themes';

const Wrapper = styled.div`
  margin: 0.6em;
  width: 50vw;
  background-color: ${props => props.theme.palette.notebook};
  height: calc(100% - ${props => props.theme.spacing.headerHeight}px);
`;
Wrapper.defaultProps = { theme: BasicTheme };

const NoContent = styled.div`
  text-align: center;
  height: 400px;
  margin-top: 50%;
`;

const Notebook: FunctionComponent = () => {
  const [files, editor] = useSelector((state: StateType) => [state.files, state.editor]);
  const dispatch = useDispatch();
  const handleSelectCell = (selected: number) => {
    dispatch(selectCell({ selected }));
  };
  const handleCellChange = (index: number, value: string, notebook: NotebookType) => {
    const cell = { ...notebook.cells[index], raw: value };
    dispatch(updateCell(cell));
  };
  const handleCommands = (event: React.KeyboardEvent<HTMLElement>, selected: number) => {
    console.log('commands=', event.key);
    if (event.key === 'D') {
      console.log('command=Delete Cell');
      dispatch(deleteCell({ selected }));
    }
  };
  let content;

  const notebook = getNotebook(editor.selected, files);
  if (notebook) {
    const { selectedCell = -1 } = editor;
    const { readOnly } = notebook;
    content = (
      <>
        {notebook.cells.map((cell: CellType, index: number) => (
          <Cell
            key={cell.id}
            format={cell.format}
            out={cell.out}
            editable={!readOnly}
            selected={index === selectedCell}
            onChange={value => {
              handleCellChange(index, value, notebook);
            }}
            onKeyPress={(e: React.KeyboardEvent<HTMLElement>) => {
              if (!readOnly) handleCommands(e, index);
            }}
            onClick={() => {
              if (!readOnly) handleSelectCell(index);
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

  return <Wrapper>{content}</Wrapper>;
};

export default Notebook;
