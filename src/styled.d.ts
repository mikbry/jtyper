/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      primary: string;
      secondary: string;
      onPrimary: string;
      background: string;
      backgroundModal: string;
      surface: string;
      onSurface: string;
      menu: string;
      divider: string;
      dividerOnLight: string;
      group: string;
      selected: string;
      onSelected: string;
      hover: string;
      onHover: string;
      disabled: string;
      notebook: string;
      text: string;
    };
    shadow: string;
    fontFamily: string;
    spacing: {
      headerHeight: number;
      drawerWidth: number;
      iconSize: number;
      fullHeightDrawer?: boolean;
    };
  }
}
