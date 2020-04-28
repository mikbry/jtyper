/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserType, SandboxType, RestType } from '../../../types';
import Parser from './Parser';

class Sandbox implements SandboxType {
  parser: ParserType | undefined;

  lastCode: string | undefined;

  lastFunc: Function | undefined;

  out: string[] = [];

  error: Error | undefined;

  console: {
    clear: Function;
    error: Function;
    info: Function;
    log: Function;
    warn: Function;
  };

  originalConsole: {
    clear: Function;
    error: Function;
    info: Function;
    log: Function;
    warn: Function;
  };

  constructor() {
    this.parser = new Parser();
    this.reset();
    const { clear, error, info, log, warn } = console;
    this.originalConsole = { clear, error, info, log, warn };
    this.console = {
      clear: (...args: RestType) => {
        this.originalConsole.clear.apply(this, args);
        this.appendConsole(args);
      },
      error: (...args: RestType) => {
        this.originalConsole.error.apply(this, args);
        this.appendConsole(args);
      },
      info: (...args: RestType) => {
        this.originalConsole.info.apply(this, args);
        this.appendConsole(args);
      },
      log: (...args: RestType) => {
        this.originalConsole.log.apply(this, args);
        this.appendConsole(args);
      },
      warn: (...args: RestType) => {
        this.originalConsole.warn.apply(this, args);
        args.forEach(a => this.out.push(JSON.stringify(a)));
      },
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

  reset() {
    this.lastCode = undefined;
    this.lastFunc = undefined;
    this.out = [];
    this.error = undefined;
  }

  async parse(source: string) {
    if (this.parser) {
      return this.parser.parse(source);
    }
    return source;
  }

  clear() {
    this.out = [];
  }

  print(text: string) {
    if (!this.out) this.out = [];
    this.out.push(text);
  }

  async execute(code: string) {
    let func: Function = this.lastFunc as Function;
    if (this.lastCode !== code) {
      try {
        const parsed = await this.parse(code);
        // eslint-disable-next-line no-new-func
        func = Function(parsed).bind(this);
        this.lastFunc = func;
      } catch (error) {
        this.error = error;
        this.lastFunc = undefined;
        this.lastCode = undefined;
        this.console.log('preprocessing error', error);
      }
    }
    if (this.lastFunc) {
      try {
        this.clear();
        const resp = func();
        if (resp) {
          this.print(resp);
        }
      } catch (error) {
        this.console.log('execution error', error);
        this.error = error;
      }
    }
    return this.out;
  }
}

export default Sandbox;
