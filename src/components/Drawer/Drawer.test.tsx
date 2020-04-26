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
import Drawer, { DrawerToolbar, DrawerFooter } from './index';
import MockupProvider from '../../test/MockupProvider';
import { BasicTheme } from '../../themes';

test('Drawer should render correctly', () => {
  const { asFragment } = render(<Drawer>content</Drawer>);
  expect(asFragment()).toMatchSnapshot();
});

test('DrawerToolbar should render correctly', () => {
  const { asFragment } = render(<DrawerToolbar>content</DrawerToolbar>);
  expect(asFragment()).toMatchSnapshot();
});

test('DrawerFooter should render correctly', () => {
  const { asFragment } = render(<DrawerFooter>content</DrawerFooter>);
  expect(asFragment()).toMatchSnapshot();
});

test('Drawer should have a fullHeightDrawer', () => {
  const theme = BasicTheme;
  theme.spacing.fullHeightDrawer = true;
  const { getByTestId } = render(
    <MockupProvider initialstate={{ title: '' }} theme={theme}>
      <Drawer>content</Drawer>
    </MockupProvider>,
  );
  const appbar = getByTestId('drawer');
  expect(appbar).toHaveStyleRule('top', `0px`);
  expect(appbar).toHaveStyleRule('min-height', `100%`);
});

test('Drawer should not have a fullHeightDrawer', () => {
  const theme = BasicTheme;
  theme.spacing.fullHeightDrawer = false;
  const { getByTestId } = render(
    <MockupProvider initialstate={{ title: '' }} theme={theme}>
      <Drawer>content</Drawer>
    </MockupProvider>,
  );
  const appbar = getByTestId('drawer');
  expect(appbar).toHaveStyleRule('top', `${theme.spacing.headerHeight}px`);
  expect(appbar).toHaveStyleRule('min-height', `calc(100% - ${theme.spacing.headerHeight}px)`);
});
