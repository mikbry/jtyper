/* eslint-disable no-restricted-syntax */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditorType, StateType } from '../../types';
import { deleteCell } from './app';

const commands = [
  {
    // We could have a selected cell and edit it
    conditions: (editor: EditorType) => !editor.readOnly && editor.selectedCell && editor.selectedCell > -1,
    shortcuts: [
      {
        key: 'd',
        ctrKey: true,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell as number;
          return deleteCell({ selected });
        },
      },
    ],
  },
];

const useCommands = () => {
  const [editor] = useSelector((state: StateType) => [state.editor]);
  const dispatch = useDispatch();
  const handleKeyboard = async (event: KeyboardEvent) => {
    for (const c of commands) {
      if (c.conditions(editor)) {
        for (const s of c.shortcuts) {
          if (s.key === event.key && s.ctrKey === event.ctrlKey) {
            dispatch(s.cmd(editor));
            return;
          }
        }
      }
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);
};

export default useCommands;
