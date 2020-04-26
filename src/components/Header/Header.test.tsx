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
import Header from './index';
import MockupProvider from '../../test/MockupProvider';
import { StateType } from '../../types';

test('Header should render correctly', () => {
  const state: Partial<StateType> = { document: { title: 'title' } };
  const { asFragment } = render(
    <MockupProvider initialstate={state}>
      <Header />
    </MockupProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
