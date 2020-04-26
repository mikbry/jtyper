/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { initialState } from '../store/reducers';
import { StoreProvider, initStore } from '../store';
import MockupProvider from './MockupProvider';
import { StateType } from '../types';

type Opts = { state?: Partial<StateType>; real?: boolean; dispatch?: Function };

const renderWithProvider = async (El: JSX.Element, { state, real = false, dispatch }: Opts) => {
  if (real) {
    const iState = { ...initialState, ...state };
    await initStore(iState);
    return render(<StoreProvider>{El}</StoreProvider>);
  }
  return render(
    <MockupProvider initialstate={state} dispatch={dispatch}>
      {El}
    </MockupProvider>,
  );
};

export default renderWithProvider;
