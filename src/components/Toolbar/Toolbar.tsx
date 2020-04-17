/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { FloppyDisk } from '@styled-icons/icomoon/FloppyDisk';
import { Plus } from '@styled-icons/icomoon//Plus';
import { Scissors } from '@styled-icons/icomoon/Scissors';
import { Copy } from '@styled-icons/icomoon/Copy';
import { Paste } from '@styled-icons/icomoon/Paste';
import { ArrowUp } from '@styled-icons/icomoon/ArrowUp';
import { ArrowDown } from '@styled-icons/icomoon/ArrowDown';
import { Next2 } from '@styled-icons/icomoon/Next2';
import { Stop2 } from '@styled-icons/icomoon//Stop2';
import { History } from '@styled-icons/icomoon/History';
import { Forward3 } from '@styled-icons/icomoon/Forward3';

/*
import { Save } from '@styled-icons/boxicons-regular/Save';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { Cut } from '@styled-icons/boxicons-regular/Cut';
import { Copy } from '@styled-icons/boxicons-regular/Copy';
import { Paste } from '@styled-icons/boxicons-regular/Paste';
import { UpArrowAlt } from '@styled-icons/boxicons-regular/UpArrowAlt';
import { DownArrowAlt } from '@styled-icons/boxicons-regular/DownArrowAlt';
import { SkipNext } from '@styled-icons/boxicons-regular/SkipNext';
import { Stop } from '@styled-icons/boxicons-regular/Stop';
import { Reset } from '@styled-icons/boxicons-regular/Reset';
import { FastForward } from '@styled-icons/boxicons-regular/FastForward';
*/

/*
import { Save } from '@styled-icons/feather/Save';
import { Plus } from '@styled-icons/feather/Plus';
import { Scissors } from '@styled-icons/feather/Scissors';
import { Copy } from '@styled-icons/feather/Copy';
import { Clipboard } from '@styled-icons/feather/Clipboard';
import { ArrowUp } from '@styled-icons/feather/ArrowUp';
import { ArrowDown } from '@styled-icons/feather/ArrowDown';
import { SkipForward } from '@styled-icons/feather/SkipForward';
import { Square } from '@styled-icons/feather/Square';
import { RotateCw } from '@styled-icons/feather/RotateCw';
import { FastForward } from '@styled-icons/feather/FastForward';
*/

import IconButton from '../IconButton';

const Styled = styled.div`
  margin-left: auto;
  margin-right: 64px;
  display: flex;
`;

const Bar = styled.div`
  margin: 4px;
  line-height: 36px;
  border: 1px solid ${props => props.theme.palette.group};
`;

const Toolbar: FunctionComponent = () => {
  const handleSave = () => {
    // TODO
  };
  return (
    <Styled>
      <Bar>
        <IconButton icon={FloppyDisk} onClick={handleSave} />
      </Bar>
      <Bar>
        <IconButton icon={Plus} onClick={handleSave} />
      </Bar>
      <Bar>
        <IconButton icon={Scissors} onClick={handleSave} />
        <IconButton icon={Copy} onClick={handleSave} />
        <IconButton icon={Paste} onClick={handleSave} />
      </Bar>
      <Bar>
        <IconButton icon={ArrowUp} onClick={handleSave} />
        <IconButton icon={ArrowDown} onClick={handleSave} />
      </Bar>
      <Bar>
        <IconButton icon={Next2} onClick={handleSave}>
          Run
        </IconButton>
        <IconButton icon={Stop2} onClick={handleSave} />
        <IconButton icon={History} onClick={handleSave} />
        <IconButton icon={Forward3} onClick={handleSave} />
      </Bar>
    </Styled>
  );
};

export default Toolbar;
