/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RestType } from '../../../types';

class Logger {
  out: string[] = [];

  clear: Function;

  error: Function;

  info: Function;

  log: Function;

  warn: Function;

  originalConsole: {
    clear: Function;
    error: Function;
    info: Function;
    log: Function;
    warn: Function;
  };

  constructor() {
    this.out = [];
    const { clear, error, info, log, warn } = console;
    this.originalConsole = { clear, error, info, log, warn };
    this.clear = () => {
      // this.originalConsole.clear.apply(this, args);
      // this.appendConsole(args);
      this.out = [];
    };
    this.error = (...args: RestType) => {
      this.originalConsole.error.apply(this, args);
      this.appendConsole(args);
    };
    this.info = (...args: RestType) => {
      this.originalConsole.info.apply(this, args);
      this.appendConsole(args);
    };
    this.log = (...args: RestType) => {
      this.originalConsole.log.apply(this, args);
      this.appendConsole(args);
    };
    this.warn = (...args: RestType) => {
      this.originalConsole.warn.apply(this, args);
      args.forEach(a => this.out.push(JSON.stringify(a)));
    };
  }

  appendConsole(args: RestType) {
    args.forEach(a => {
      let s = a;
      if (a.toString) {
        s = a.toString();
      } else {
        s = JSON.stringify(a);
      }
      this.out.push(s);
    });
  }

  print(text: string) {
    if (!this.out) this.out = [];
    console.log('print=', text);
    this.out.push(text);
  }
}

export default Logger;
