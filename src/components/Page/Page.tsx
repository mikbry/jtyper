/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BasicTheme } from '../../themes';

const GlobalStyle = createGlobalStyle`
  html {
   height: 100%;
  }
  body {
    font-family: ${props => props.theme.fontFamily};
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
    background-color: ${props => props.theme.palette.background}
  }
  #root {
    height: 100%;
  }
`;

const theme = BasicTheme;

const Page: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
    </>
    {children}
  </ThemeProvider>
);

export default Page;
