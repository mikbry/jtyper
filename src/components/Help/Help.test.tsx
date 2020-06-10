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
import Help from './index';

test('Help should render correctly', () => {
  const { asFragment } = render(<Help />);
  expect(asFragment()).toMatchSnapshot();
});
