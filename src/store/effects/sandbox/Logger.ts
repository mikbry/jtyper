/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RestType, LogEntryType } from '../../../types';
import { generateId } from '../../selectors';

class Logger {
  out: LogEntryType[] = [];

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
      args.forEach(a => this.out.push({ id: generateId(), type: 'text', text: JSON.stringify(a) }));
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
      this.out.push({ id: generateId(), type: 'text', text: s });
    });
  }

  print(text: string) {
    if (!this.out) this.out = [];
    this.out.push({ id: generateId(), type: 'text', text });
  }
}

export default Logger;
