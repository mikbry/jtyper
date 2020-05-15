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
import ContentEditable from './index';
import MockupEvent from '../../test/MockupEvent';

test('ContentEditable should render correctly', () => {
  const fn = jest.fn();
  const { asFragment } = render(<ContentEditable value='content' onChange={fn} focus />);
  expect(asFragment()).toMatchSnapshot();
});

test('ContentEditable should have a value', () => {
  const on = jest.fn();
  const { getByTestId } = render(<ContentEditable value='text' onChange={on} focus />);
  const content = getByTestId('contenteditable');
  expect(content.textContent).toBe('text');
  expect(on).toHaveBeenCalledTimes(0);
  fireEvent(
    content,
    new MockupEvent('keydown', {
      bubbles: true,
      keyCode: 27,
    }),
  );
  fireEvent(
    content,
    new MockupEvent('keydown', {
      bubbles: true,
      keyCode: 96,
    }),
  );
  fireEvent(
    content,
    new MockupEvent('blur', {
      bubbles: true,
    }),
  );
  expect(on).toHaveBeenCalledTimes(2);
});
