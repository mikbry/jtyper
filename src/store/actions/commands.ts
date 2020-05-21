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
import { runCell, deleteCell, selectCell, save, cut, copy, paste } from './app';

const commands = [
  {
    // We could edit a notebook
    conditions: (editor: EditorType) => !editor.readOnly,
    shortcuts: [
      {
        key: 's',
        name: 'Save notebook',
        ctrlKey: true,
        altKey: false,
        cmd: () => save(),
      },
      {
        key: 'v',
        name: 'Paste cell',
        ctrlKey: true,
        altKey: false,
        cmd: () => paste(),
      },
      {
        key: 'ArrowUp',
        name: 'arrow up',
        ctrlKey: false,
        altKey: false,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell === undefined ? 0 : editor.selectedCell - 1;
          return selectCell({ selected });
        },
      },
      {
        key: 'ArrowDown',
        name: 'arrow down',
        ctrlKey: false,
        altKey: false,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell === undefined ? 0 : editor.selectedCell + 1;
          return selectCell({ selected });
        },
      },
    ],
  },
  {
    // We could have a selected cell and edit it
    conditions: (editor: EditorType) =>
      !editor.readOnly && editor.selectedCell !== undefined && editor.selectedCell > -1,
    shortcuts: [
      {
        key: 'd',
        name: 'Delete cell',
        ctrlKey: true,
        altKey: false,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell as number;
          return deleteCell({ selected });
        },
      },
      {
        key: 'x',
        name: 'Cut cell',
        ctrlKey: true,
        altKey: false,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell as number;
          return cut({ selected });
        },
      },
      {
        key: 'c',
        name: 'Copy cell',
        ctrlKey: true,
        altKey: false,
        cmd: () => copy({}),
      },
    ],
  },
  {
    // Work for any conditions
    conditions: () => true,
    shortcuts: [
      {
        key: 'Enter',
        name: 'Run cell',
        ctrlKey: true,
        altKey: false,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell as number;
          return runCell({ selected });
        },
      },
      {
        key: 'Enter',
        name: 'Run all',
        altKey: true,
        cmd: () => runCell({ all: true }),
      },
    ],
  },
];

const useCommands = () => {
  const [editor] = useSelector((state: StateType) => [state.editor]);
  const dispatch = useDispatch();
  const isMac = navigator.platform.indexOf('Mac') > -1;
  const handleKeyboard = async (event: KeyboardEvent) => {
    for (const c of commands) {
      if (c.conditions(editor)) {
        for (const s of c.shortcuts) {
          if (
            s.key === event.key &&
            (isMac ? s.ctrlKey === event.metaKey : s.ctrlKey === event.ctrlKey) &&
            s.altKey === event.altKey
          ) {
            event.preventDefault();
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
