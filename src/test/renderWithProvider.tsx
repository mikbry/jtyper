/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { DefaultTheme } from 'styled-components';
import { initialState } from '../store/reducers';
import { initStore } from '../store';
import { StateType } from '../types';
import { initEffects } from '../store/effects';

type Opts = {
  state?: Partial<StateType>;
  real?: boolean;
  dispatch?: Function;
  store?: Store;
  theme?: DefaultTheme;
  history?: string[];
};

const renderWithProvider = async (
  El: JSX.Element,
  { state, real = false, dispatch, store: s, theme, history }: Opts,
) => {
  let store = s;
  if (real) {
    const iState = { ...initialState, ...state };
    store = await initStore(iState, true);
  } else if (!store || state) {
    initEffects({});
    const mockStore = configureStore([thunk]);
    store = mockStore({
      editor: {},
      dispatch,
      theme,
      ...state,
    });
  }
  const result = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={history} initialIndex={0}>
        {El}
      </MemoryRouter>
    </Provider>,
  );
  return { ...result, store };
};

export default renderWithProvider;
