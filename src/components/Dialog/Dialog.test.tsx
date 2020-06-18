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
import Dialog from './index';

test('Modal should render correctly', () => {
  const { asFragment } = render(<Dialog actions={['ok']}>content</Dialog>);
  expect(asFragment()).toMatchSnapshot();
});

test('Modal should have actions', () => {
  const onAction = jest.fn();
  const { getAllByRole } = render(<Dialog actions={['ok', 'cancel']}>content</Dialog>);
  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(2);
  fireEvent.click(buttons[0]);
  expect(onAction).toHaveBeenCalledTimes(0);
});

test('Modal should call onAction', () => {
  const onAction = jest.fn();
  const { getAllByRole } = render(
    <Dialog onAction={onAction} actions={['ok', 'cancel']}>
      content
    </Dialog>,
  );
  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(2);
  fireEvent.click(buttons[0]);
  expect(onAction).toHaveBeenCalledTimes(1);
});
