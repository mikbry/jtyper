/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Cell from '../Cell';
import { useStore, useActions } from '../../store';
import { getCurrentNotebook } from '../../store/selectors';
import { CellType } from '../../types';

const Wrapper = styled.div`
  padding: 0.6em;
  margin: 0.6em;
  width: 50vw;
  background-color: white;
  height: calc(100% - 48px);
`;

const NoContent = styled.div`
  text-align: center;
  height: 400px;
  margin-top: 50%;
`;

const Notebook: FunctionComponent = () => {
  const { editor, files } = useStore();
  const selected = editor.selected;

  const handleSelectCell = (index: number) => {
    console.log('TODO handleSelectCell', index);
  };

  let content;
  const notebook = getCurrentNotebook(editor, files);
  if (notebook) {
    const { selectedCell = -1 } = notebook;
    const { readOnly } = notebook;
    content = (
      <>
        {notebook.cells.map((cell: CellType, index: number) => (
          <Cell
            key={cell.id}
            editable={!readOnly}
            selected={index === selectedCell}
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
