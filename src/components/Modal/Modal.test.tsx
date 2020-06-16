/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from '@testing-library/react';
import Modal from './index';

test('Modal should render correctly', () => {
  const { asFragment } = render(<Modal>content</Modal>);
  expect(asFragment()).toMatchSnapshot();
});

test('Modal click outside should call onClose', () => {
  const onClose = jest.fn();
  const { getByTestId } = render(<Modal onClose={onClose}>content</Modal>);
  const bg = getByTestId('modal-background');
  bg.click();
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('Modal click outside without onClose should not call onClose', () => {
  const onClose = jest.fn();
  const { getByTestId } = render(<Modal>content</Modal>);
  const bg = getByTestId('modal-background');
  bg.click();
  expect(onClose).toHaveBeenCalledTimes(0);
});
