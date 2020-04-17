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
import { useStore } from '../../store';

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
  const { project } = useStore();
  const selected = project?.selected;

  const handleSelectCell = (index: number) => {
    console.log('handleSelectCell', index);
  };

  let content;
  if (project && selected !== undefined) {
    const notebook = project.files[selected];
    content = (
      <>
        {notebook.cells.map((cell, index) => (
          <Cell key={cell.id} selected={index === selected} onClick={() => handleSelectCell(index)}>
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
