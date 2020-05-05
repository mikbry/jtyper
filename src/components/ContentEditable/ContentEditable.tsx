/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { KeyboardEvent, FunctionComponent, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const Styled = styled.div`
  width: 100%;
  min-height: calc(32px - 1.2em);
`;

const getText = (ref: React.RefObject<HTMLInputElement>) => {
  if (ref.current) return ref.current.innerText;
  return '';
};

const ContentEditable: FunctionComponent<Props> = ({ value, onChange }) => {
  const elRef = useRef<HTMLInputElement>(null);
  getText(elRef);
  useEffect(() => {
    // setCell
  }, []);
  const handleClick = () => {
    // TODO
  };
  const handleBlur = () => {
    onChange(getText(elRef));
  };
  const handleKey = (e: KeyboardEvent) => {
    const { keyCode } = e;
    if (keyCode === 27) {
      onChange(getText(elRef));
    } else {
      return;
    }
    e.preventDefault();
  };
  return (
    <Styled
      role='button'
      onClick={handleClick}
      onKeyDown={handleKey}
      onBlur={handleBlur}
      tabIndex={0}
      contentEditable
      ref={elRef}
      suppressContentEditableWarning
      data-testid='contenteditable'
    >
      {value}
    </Styled>
  );
};

export default ContentEditable;
