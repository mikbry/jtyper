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
    background: 'white',
    surface: 'gainsboro',
    onSurface: '#999',
    menu: '#333',
    divider: 'rgba(255,255,255,0.2)',
    dividerOnLight: 'rgba(0,0,0,0.08)',
    group: 'rgba(255,255,255,0.1)',
    selected: 'rgba(255,255,255,0.3)',
    onSelected: 'white',
    hover: 'rgba(255,255,255,0.7)',
    onHover: 'white',
    disabled: 'rgba(255,255,255,0.4)',
    notebook: 'white',
  },
  fontFamily: 'sans-serif',
  spacing: {
    headerHeight: 48,
    drawerWidth: 200,
    fullHeightDrawer: true,
    iconSize: 18,
  },
};

export { BasicTheme };
