/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { useStore } from './store';

const StoreProvider: FunctionComponent<{}> = ({ children }) =>
  React.createElement(Provider, { store: useStore() }, children);

export default StoreProvider;
