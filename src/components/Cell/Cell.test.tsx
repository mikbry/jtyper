/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockupProvider from '../../test/MockupProvider';
import FakeMouseEvent from '../../test/FakeMouseEvent';
import { LogEntryType } from '../../types';

import Cell from './index';

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 308 });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 116 });
  // Stubs for codemirror
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({ left: 22, top: 90 }),
  });
  Object.defineProperty(document.body, 'createTextRange', {
    value: () => ({ getBoundingClientRect: jest.fn(), getClientRects: () => ({ length: 0 }) }),
  });
});

test('Cell should render correctly', () => {
  const on = jest.fn();
  const { asFragment } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on}>
        text
      </Cell>
    </MockupProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Cell should have a value', () => {
  const on = jest.fn();
  const { getByTestId } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on}>
        text
      </Cell>
    </MockupProvider>,
  );
  const content = getByTestId('rawcontent');
  expect(content.textContent).toBe('text');
  fireEvent(
    content,
    new FakeMouseEvent('blur', {
      bubbles: true,
    }),
  );
  expect(on).toHaveBeenCalledTimes(0);
  fireEvent(
    content,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowRight',
    }),
  );
  expect(on).toHaveBeenCalledTimes(0);
});

test('Cell should be editable and hover', () => {
  const on = jest.fn();
  const { getByTestId, getAllByRole } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on} editable>
        text
      </Cell>
    </MockupProvider>,
  );
  const cell = getAllByRole('button')[0];
  const content = getByTestId('rawcontent');
  let style = getComputedStyle(content);
  expect(style.border).toBe('1px solid white');
  fireEvent.mouseOver(cell);
  style = getComputedStyle(content);
  expect(style.border).toBe('1px solid white');
});

test('Cell should be editable and selected', () => {
  const on = jest.fn();
  const { getByTestId } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on} editable selected>
        text
      </Cell>
    </MockupProvider>,
  );
  const content = getByTestId('contenteditable');
  expect(content.textContent).toBe('text');
  fireEvent.click(content);
  expect(on).toHaveBeenCalledTimes(1);
});

test('Cell with markdown should display Highlighter', () => {
  const on = jest.fn();
  const { getByTestId } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on} format='markdown'>
        text
      </Cell>
    </MockupProvider>,
  );
  const content = getByTestId('highlighter');
  expect(content.textContent?.trim()).toBe('text');
  expect(on).toHaveBeenCalledTimes(0);
});

test('editable & selected Cell with markdown should display Editor', () => {
  const on = jest.fn();
  const { getByRole } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on} format='markdown' editable selected>
        text
      </Cell>
    </MockupProvider>,
  );
  const content = getByRole('button').firstChild?.childNodes[1];
  expect(content).toHaveClass('react-codemirror2');
  expect(content?.textContent?.trim()).toBe('text');
  expect(on).toHaveBeenCalledTimes(0);
});

test('Cell with code should display CodeHighlighter', () => {
  const on = jest.fn();
  const { getByRole } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on} format='code'>
        text
      </Cell>
    </MockupProvider>,
  );
  const content = getByRole('button').firstChild?.childNodes[1];
  expect(content?.textContent?.trim()).toBe('text');
  expect(on).toHaveBeenCalledTimes(0);
});

test('editable & selected Cell with code should display Editor', () => {
  jest.useFakeTimers();
  const on = jest.fn();
  const { getByRole } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on} format='code' editable selected>
        text
      </Cell>
    </MockupProvider>,
  );
  const content = getByRole('button').firstChild?.childNodes[1];
  expect(content).toHaveClass('react-codemirror2');
  expect(content?.textContent?.trim()).toBe('text');
  expect(on).toHaveBeenCalledTimes(0);
});

test('editable & selected Cell with code should be changed', async () => {
  const onClick = jest.fn();
  const onKey = jest.fn();
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { getByRole } = render(
    <MockupProvider>
      <Cell onKeyPress={onKey} onClick={onClick} onChange={onChange} format='code' editable selected>
        {' '}
      </Cell>
    </MockupProvider>,
  );
  const content = getByRole('button').firstChild?.childNodes[1] as HTMLElement;
  expect(content?.textContent?.trim()).toBe('');
  const container = content?.firstChild as HTMLElement;
  const helloword = 'Hello world';
  const textarea: HTMLTextAreaElement = content?.firstChild?.firstChild?.firstChild as HTMLTextAreaElement;
  if (textarea) {
    fireEvent(
      textarea,
      new FakeMouseEvent('keydown', {
        bubbles: true,
        key: 'a',
        keyCode: 97,
        charCode: 97,
      }),
    );
    jest.advanceTimersByTime(1000);
    expect(container).toHaveClass('CodeMirror-focused');
    await userEvent.type(textarea, helloword);
  }
  expect(onChange).toHaveBeenCalledTimes(helloword.length);
  expect(value).toBe(` ${helloword}`);
});

test('Cell with code out should display it', () => {
  const on = jest.fn();
  const out: LogEntryType[] = [
    { type: 'text', id: '1', text: 'text' },
    { type: 'error', id: '2', text: 'error' },
  ];
  const { getByRole } = render(
    <MockupProvider>
      <Cell onKeyPress={on} onClick={on} onChange={on} format='code' out={out}>
        text
      </Cell>
    </MockupProvider>,
  );
  const content = getByRole('button').firstChild?.childNodes[1];
  expect(content?.textContent?.trim()).toBe('text');
  expect(on).toHaveBeenCalledTimes(0);
});
