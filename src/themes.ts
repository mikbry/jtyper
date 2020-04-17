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
    primary: 'dimgray',
    secondary: 'orange',
    onPrimary: 'white',
    background: 'whitesmoke',
    surface: 'gainsboro',
    onSurface: '#999',
    menu: '#333',
    divider: '#111',
    group: '#888',
    selected: 'white',
    disabled: 'rgba(1, 1, 1, 0.5)',
  },
  fontFamily: 'sans-serif',
  spacing: {
    headerHeight: 48,
    explorerWidth: 200,
    iconSize: 18,
  },
};

export { BasicTheme };
