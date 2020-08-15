/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RestType, LogEntryType } from '../../../types';
import { generateId } from '../../selectors';

type ConsoleType = {
  [key: string]: Function;
  clear: Function;
  error: Function;
  info: Function;
  log: Function;
  warn: Function;
};

type LoggerOptions = { console?: unknown };

class Logger {
  out: LogEntryType[] = [];

  originalConsole?: ConsoleType;

  constructor(opts: LoggerOptions = {}) {
    this.out = [];
    if (opts.console) {
      const { clear, error, info, log, warn } = opts.console as ConsoleType;
      this.originalConsole = { clear, error, info, log, warn };
    }
  }

  clear() {
    // this.originalConsole.clear.apply(this, args);
    // this.appendConsole(args);
    this.out = [];
  }

  error(...args: RestType) {
    this.consoleOut('error', args);
  }

  info(...args: RestType) {
    this.consoleOut('info', args);
  }

  log(...args: RestType) {
    this.consoleOut('log', args);
  }

  warn(...args: RestType) {
    this.consoleOut('warn', args);
  }

  consoleOut(type: string, args: RestType) {
    if (this.originalConsole) {
      this.originalConsole[type].apply(this, args);
    }
    this.appendConsole({ args, type });
  }

  print(value: number | string | undefined | null | [] | object | bigint | boolean, _type = 'text') {
    let text: unknown = value;
    let type = _type;
    if (value === undefined) {
      text = 'undefined';
    } else if (value === null) {
      text = 'null';
    } else if ((text as Error).message) {
      text = (text as Error).message;
      type = 'error';
    } else if (typeof value === 'object' || Array.isArray(value)) {
      text = JSON.stringify(value);
    } else {
      // if (value.toString) {
      text = value.toString();
    } /* else if (typeof value === 'string') {
      text = value;
    } else if (Number.isNaN(Number(value))) {
      text = 'NaN';
    } else {
      text = `${value}`;
    } */
    this.out.push({ id: generateId(), type, text: text as string });
  }

  appendConsole({ args, type }: { args: RestType; type: string }) {
    args.forEach((a) => {
      this.print(a, type);
    });
  }
}

export default Logger;
