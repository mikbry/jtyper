/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore, { MockStore } from 'redux-mock-store';
import { DefaultTheme } from 'styled-components';

import { StateType } from '../types';
import { BasicTheme } from '../themes';
import { initEffects } from '../store/effects';

Object.defineProperty(window, 'focus', {
  value: () => {
    //
  },
});

type MockupProviderProps = {
  initialstate?: Partial<StateType>;
  theme?: DefaultTheme;
  dispatch?: Function;
};

let store: MockStore;

const MockupProvider: FunctionComponent<MockupProviderProps> = ({
  initialstate = {},
  theme = BasicTheme,
  children,
  dispatch = () => {
    /* */
  },
}) => {
  if (!store || initialstate) {
    initEffects([{}]);
    const mockStore = configureStore([thunk]);
    store = mockStore({
      editor: {},
      dispatch,
      theme,
      ...initialstate,
    });
    const storeDispatch = store.dispatch;
    store.dispatch = ((action: AnyAction) => {
      storeDispatch(action);
      if (dispatch) {
        const state = store.getState();
        dispatch(state);
      }
    }) as Dispatch<AnyAction>;
  }
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};
export default MockupProvider;
