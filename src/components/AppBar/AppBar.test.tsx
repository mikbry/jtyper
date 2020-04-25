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
import MockupProvider from '../../test/MockupProvider';
import { BasicTheme } from '../../themes';

import AppBar from './index';

test('AppBar should render correctly', () => {
  const { asFragment } = render(
    <MockupProvider>
      <AppBar>Content</AppBar>
    </MockupProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

test('AppBar should have a title', () => {
  const { getByTestId } = render(
    <MockupProvider initialstate={{ title: 'Hello' }}>
      <AppBar />
    </MockupProvider>,
  );
  const appbar = getByTestId('appbar');
  expect(appbar.textContent).toBe('Hello');
});

test('AppBar should not have a title', () => {
  const { getByTestId } = render(
    <MockupProvider>
      <AppBar />
    </MockupProvider>,
  );
  const appbar = getByTestId('appbar');
  expect(appbar.textContent).toBe('');
});

test('AppBar should have children', () => {
  const { getAllByTestId } = render(
    <MockupProvider initialstate={{ title: '' }}>
      <AppBar>
        <span data-testid='span'>text1</span>
        <span data-testid='span'>text2</span>
      </AppBar>
    </MockupProvider>,
  );
  const spans = getAllByTestId('span');
  expect(spans.length).toBe(2);
  expect(spans[0].textContent).toBe('text1');
  expect(spans[1].textContent).toBe('text2');
});

test('AppBar should have a fullHeightDrawer', () => {
  const theme = BasicTheme;
  theme.spacing.fullHeightDrawer = true;
  const { getByTestId } = render(
    <MockupProvider initialstate={{ title: '' }} theme={theme}>
      <AppBar>
        <span data-testid='span'>text1</span>
        <span data-testid='span'>text2</span>
      </AppBar>
    </MockupProvider>,
  );
  const appbar = getByTestId('appbar');
  expect(appbar).toHaveStyleRule('left', `${theme.spacing.drawerWidth}px`);
  expect(appbar).toHaveStyleRule('width', `calc(100% - ${theme.spacing.drawerWidth}px)`);
});

test('AppBar should not have a fullHeightDrawer', () => {
  const theme = BasicTheme;
  theme.spacing.fullHeightDrawer = false;
  const { getByTestId } = render(
    <MockupProvider initialstate={{ title: '' }} theme={theme}>
      <AppBar>
        <span data-testid='span'>text1</span>
        <span data-testid='span'>text2</span>
      </AppBar>
    </MockupProvider>,
  );
  const appbar = getByTestId('appbar');
  expect(appbar).toHaveStyleRule('left', '0px');
  expect(appbar).toHaveStyleRule('width', '100%');
});
