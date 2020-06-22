/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { Play3 } from '@styled-icons/icomoon/Play3';
import { CellState } from '../../types';
import IconButton from '../IconButton';

interface Props {
  state?: CellState;
  selectionColor: string;
  onAction: (action: string) => void;
}

const Action: FunctionComponent<Props> = ({ state, selectionColor, onAction }) => {
  let color;
  let hover;
  if (state === 'run') {
    // Source : https://samherbert.net/svg-loaders/
    return (
      <>
        <svg width={20} height={20} stroke='#888' viewBox='0 0 44 44' style={{ margin: '4px' }}>
          <g transform='translate(1 1)' strokeWidth={4} fill='none' fillRule='evenodd'>
            <circle strokeOpacity={0.5} cx={18} cy={18} r={18} />
            <path d='M36 18c0-9.94-8.06-18-18-18'>
              <animateTransform
                attributeName='transform'
                type='rotate'
                from='0 18 18'
                to='360 18 18'
                dur='1s'
                repeatCount='indefinite'
              />
            </path>
          </g>
        </svg>
      </>
    );
  }
  if (state === 'ran') {
    color = 'rgba(0,255,0,0.5)';
    hover = 'rgb(0,255,0)';
  } else if (state === 'error') {
    color = 'rgba(255,0,0,0.5)';
    hover = 'red';
  } else {
    hover = selectionColor;
  }
  const handleRun = () => {
    onAction('run');
  };
  return (
    <>
      <IconButton icon={Play3} onClick={handleRun} hover={hover} color={color} />
    </>
  );
};

export default Action;
