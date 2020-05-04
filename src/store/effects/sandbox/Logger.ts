/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RestType, LogEntryType, DataType } from '../../../types';
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

  print(value: DataType) {
    if (!this.out) this.out = [];
    let text: unknown = value;
    let type = 'text';
    if (value === undefined) {
      text = 'undefined';
    } else if (value === null) {
      text = 'null';
    } else if ((text as Error).message) {
      text = (text as Error).message;
      type = 'error';
    } else if (typeof value === 'object' || Array.isArray(value)) {
      text = JSON.stringify(value);
    } else if (value.toString) {
      text = value.toString();
    } else if (typeof value === 'string') {
      text = value;
    } else if (Number.isNaN(Number(value))) {
      text = 'NaN';
    } else {
      text = `${value}`;
    }
    this.out.push({ id: generateId(), type, text: text as string });
  }

  appendConsole(args: RestType) {
    args.forEach(a => {
      this.print(a);
    });
  }
}

export default Logger;
