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
import Select from './index';
import FakeMouseEvent from '../../test/FakeMouseEvent';

test('Select should render correctly', () => {
  const onChange = jest.fn();
  const { asFragment } = render(<Select options={[{ key: '1', value: 'item1' }]} onChange={onChange} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Select should have one item', () => {
  const onChange = jest.fn();
  const { getAllByTestId } = render(<Select options={[{ key: '1', value: 'item1' }]} onChange={onChange} />);
  const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('item1');
  fireEvent.click(items[0]);
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('Select should be disabled', () => {
  const onChange = jest.fn();
  const { getByRole } = render(<Select options={[{ key: '1', value: 'item1' }]} disabled onChange={onChange} />);
  const select = getByRole('button');
  fireEvent.click(select);
  fireEvent(
    select,
    new FakeMouseEvent('blur', {
      bubbles: true,
    }),
  );
  fireEvent(
    select,
    new FakeMouseEvent('keypress', {
      bubbles: true,
      key: 'a',
      keyCode: 97,
      charCode: 97,
    }),
  );
});

test('Select should be open', () => {
  const onChange = jest.fn();
  const { getByRole } = render(<Select options={[{ key: '1', value: 'item1' }]} open onChange={onChange} />);
  const select = getByRole('button');
  fireEvent(
    select,
    new FakeMouseEvent('blur', {
      bubbles: true,
    }),
  );
});

test('Select should have one item selected', () => {
  const onChange = jest.fn();
  const { getAllByTestId } = render(
    <Select options={[{ key: '1', value: 'item1', selected: true }]} onChange={onChange} />,
  );
  const items = getAllByTestId('item');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toBe('item1');
  fireEvent.click(items[0]);
  expect(onChange).toHaveBeenCalledTimes(0);
});
