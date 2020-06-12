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
import Input from './index';

test('Input should render correctly', () => {
  const { asFragment } = render(<Input defaultValue='Some text' />);
  expect(asFragment()).toMatchSnapshot();
});
