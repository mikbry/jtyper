/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DefaultTheme } from 'styled-components';

const BasicTheme: DefaultTheme = {
  palette: {
    primary: 'gray',
    secondary: 'blue',
    onPrimary: 'white',
    background: 'oldlace',
    surface: 'lightgray',
    onSurface: '#999',
  },
  fontFamily: 'sans-serif',
  spacing: {
    headerHeight: 48,
    explorerWidth: 200,
  },
};

export { BasicTheme };
