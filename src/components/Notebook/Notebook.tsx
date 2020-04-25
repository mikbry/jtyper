/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Cell from '../Cell';
import { useActions } from '../../store';
import { getCurrentNotebook } from '../../store/selectors';
import { CellType, StateType } from '../../types';

const Wrapper = styled.div`
  margin: 0.6em;
  width: 50vw;
  background-color: ${props => props.theme.palette.notebook};
  height: calc(100% - ${props => props.theme.spacing.headerHeight}px);
`;

const NoContent = styled.div`
  text-align: center;
  height: 400px;
  margin-top: 50%;
`;

const Notebook: FunctionComponent = () => {
  const [files, editor] = useSelector((state: StateType) => [state.files, state.editor]);
  const { selectCell, updateCell } = useActions();
  const handleSelectCell = (selected: number) => {
    selectCell({ selected });
  };
  const notebook = getCurrentNotebook(editor, files);
  const handleCellChange = (index: number, value: string) => {
    if (notebook) {
      const cell = { ...notebook.cells[index], raw: value };
      updateCell(cell);
    }
  };

  let content;
  if (notebook) {
    const { selectedCell = -1 } = editor;
    const { readOnly } = notebook;
    content = (
      <>
        {notebook.cells.map((cell: CellType, index: number) => (
          <Cell
            key={cell.id}
            format={cell.format}
            editable={!readOnly}
            selected={index === selectedCell}
            onChange={value => {
              if (!readOnly) handleCellChange(index, value);
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
