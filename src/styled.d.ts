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
      surface: string;
      onSurface: string;
    };
    fontFamily: string;
    spacing: {
      headerHeight: number;
      explorerWidth: number;
    };
  }
}
