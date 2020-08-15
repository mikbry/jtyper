/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import MockupProvider from './MockupProvider';
import renderWithProvider from './renderWithProvider';
import localStorageMock from './localStorageMock';
import MockupEvent from './MockupEvent';

import './MockupWorker';

document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = () => {
    return {
      x: 0,
      y: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      toJSON: () => {}
    };
  };

  range.getClientRects = () => {
    return {
      item: () => null,
      length: 0,
      *[Symbol.iterator](){}
    };
  };

  return range;
}

export { localStorageMock, MockupProvider, renderWithProvider, MockupEvent };
