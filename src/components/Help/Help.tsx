/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Modal from '../Modal';
import { BasicTheme } from '../../themes';
import { commands } from '../../store/actions/commands';

interface StyledProps {
  theme: DefaultTheme;
}

const Container = styled.div`
  background: ${(props: StyledProps) => props.theme.palette.background};
`;
Container.defaultProps = { theme: BasicTheme };

const Table = styled.table`
  padding: 8px;
  width: 100%;
  & > thead {
    text-align: left;
    height: 32px;
  }
`;

type Keybinding = {
  name: string;
  when: Array<string>;
  key: string;
  ctrlKey: boolean;
  altKey: boolean;
};

const Help: FunctionComponent<{ onClose?: Function }> = ({ onClose }) => {
  const keybindings: Record<string, Keybinding> = {};
  commands.forEach((cmd) => {
    const { when } = cmd;
    cmd.keybindings.forEach((kb) => {
      if (keybindings[kb.name]) {
        keybindings[kb.name].when.push(when);
      } else {
        const { name, key, ctrlKey, altKey } = kb;
        keybindings[name] = { name, when: [when], key, ctrlKey, altKey };
      }
    });
  });
  const shortcuts = (
    <Table>
      <thead>
        <tr>
          <th>Command</th>
          <th>Keybinding</th>
          <th>When</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(keybindings).map((n) => (
          <tr key={`${keybindings[n].key}_${keybindings[n].ctrlKey}_${keybindings[n].altKey}`}>
            <td>{keybindings[n].name}</td>
            <td>
              {keybindings[n].ctrlKey ? 'ctrl+' : ''}
              {keybindings[n].altKey ? 'alt+' : ''}
              {keybindings[n].key}
            </td>
            <td>
              {keybindings[n].when.map((w) => (
                <div key={`${w.length} _${keybindings[n].key}`}>{w}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  return (
    <Modal onClose={onClose}>
      <Container>Help{shortcuts}</Container>
    </Modal>
  );
};

export default Help;
