/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { DefaultTheme } from 'styled-components';
import { setStore } from '../store';
import { StateType } from '../types';
import { BasicTheme } from '../themes';

type MockupProviderProps = {
  initialstate?: Partial<StateType>;
  theme?: DefaultTheme;
};
const MockupProvider: FunctionComponent<MockupProviderProps> = ({
  initialstate = {},
  theme = BasicTheme,
  children,
}) => {
  const mockStore = configureStore([]);
  const store = mockStore({
    editor: {},
    dispatch: () => {
      /* */
    },
    theme,
    ...initialstate,
  });
  setStore(store);
  return <Provider store={store}>{children}</Provider>;
};
export default MockupProvider;
