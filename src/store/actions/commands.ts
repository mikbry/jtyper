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
import { runCell, createCell, deleteCell, selectCell, save, cut, copy, paste, toggleHelp } from './app';

export const commands = [
  {
    when: 'We could edit a notebook',
    conditions: (editor: EditorType) => !editor.readOnly,
    keybindings: [
      {
        key: 's',
        name: 'Save notebook',
        ctrlKey: true,
        altKey: false,
        cmd: () => save(),
      },
      {
        key: 'a',
        name: 'Create cell',
        ctrlKey: true,
        altKey: false,
        cmd: () => createCell(),
      },
    ],
  },
  {
    when: 'We could edit a notebook and not in editor mode',
    conditions: (editor: EditorType) => !editor.readOnly && !editor.mode,
    keybindings: [
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
          return selectCell({ selected, mode: undefined });
        },
      },
      {
        key: 'ArrowDown',
        name: 'arrow down',
        ctrlKey: false,
        altKey: false,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell === undefined ? 0 : editor.selectedCell + 1;
          return selectCell({ selected, mode: undefined });
        },
      },
    ],
  },
  {
    when: 'We have a selected cell and editable notebook',
    conditions: (editor: EditorType) =>
      !editor.readOnly && editor.selectedCell !== undefined && editor.selectedCell > -1 && !editor.mode,
    keybindings: [
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
    when: 'We have a selected cell in edit mode',
    conditions: (editor: EditorType) =>
      !editor.readOnly && editor.selectedCell !== undefined && editor.selectedCell > -1 && editor.mode === 'edit',
    keybindings: [
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
        key: 'Escape',
        name: 'Escape cell',
        ctrlKey: false,
        altKey: false,
        cmd: () => selectCell({ selected: undefined, mode: undefined }),
      },
    ],
  },
  {
    when: 'We have a selected cell not in edit mode',
    conditions: (editor: EditorType) => !editor.readOnly && editor.mode === undefined,
    keybindings: [
      {
        key: 'Enter',
        name: 'Enter cell',
        ctrlKey: false,
        altKey: false,
        cmd: (editor: EditorType) => {
          const selected = editor.selectedCell || 0;
          return selectCell({ selected, mode: 'edit' });
        },
      },
    ],
  },
  {
    when: 'Any time',
    conditions: () => true,
    keybindings: [
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
        ctrlKey: false,
        altKey: true,
        cmd: (editor: EditorType) => {
          const next = editor.selectedCell as number;
          return runCell({ all: true, next });
        },
      },
      {
        key: 'h',
        name: 'Display help',
        ctrlKey: true,
        altKey: false,
        cmd: (editor: EditorType) => toggleHelp({ enable: !editor.displayHelp }),
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
        for (const s of c.keybindings) {
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
