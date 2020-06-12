/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  & > button {
    width: 64px;
  }
`;

const Dialog: FunctionComponent<{ title?: string; actions: Array<string>; onAction?: Function }> = ({
  title,
  children,
  actions,
  onAction,
}) => {
  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action);
    }
  };
  return (
    <Modal>
      <Wrapper>
        <h2>{title}</h2>
        {children}
        <div>
          {actions.map(a => (
            <button
              type='button'
              key={a}
              onClick={() => {
                handleAction(a);
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </Wrapper>
    </Modal>
  );
};

export default Dialog;
