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
import { FileText2 } from '@styled-icons/icomoon/FileText2';
import IconButton from './index';
import { BasicTheme } from '../../themes';

test('IconButton should render correctly', () => {
  const on = jest.fn();
  const { asFragment } = render(<IconButton icon={FileText2} onClick={on} />);
  expect(asFragment()).toMatchSnapshot();
});

test('IconButton should be disabled', () => {
  const on = jest.fn();
  const { getByRole } = render(<IconButton icon={FileText2} disabled onClick={on} />);
  const button = getByRole('button');
  expect(button).toHaveStyleRule('color', BasicTheme.palette.disabled);
  fireEvent.click(button);
  expect(on).toHaveBeenCalledTimes(0);
});

test('IconButton should setup size', () => {
  const on = jest.fn();
  const { getByRole } = render(<IconButton icon={FileText2} size={16} onClick={on} />);
  const svg = getByRole('button').firstChild as HTMLElement;
  const style = getComputedStyle(svg);
  expect(style.width).toBe('16px');
  expect(style.height).toBe('16px');
});

test('IconButton should have child', () => {
  const on = jest.fn();
  const { getByRole } = render(
    <IconButton icon={FileText2} onClick={on}>
      text
    </IconButton>,
  );
  const button = getByRole('button');
  expect(button.textContent).toBe('text');
});
