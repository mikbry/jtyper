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
import Button from '../Button';

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
    <Modal onClose={handleAction}>
      <Wrapper>
        <h2>{title}</h2>
        {children}
        <div>
          {actions.map((a) => (
            <Button
              type='button'
              key={a}
              onClick={() => {
                handleAction(a);
              }}
            >
              {a}
            </Button>
          ))}
        </div>
      </Wrapper>
    </Modal>
  );
};

export default Dialog;
