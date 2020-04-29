/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserType, SandboxType } from '../../../types';
import Parser from './Parser';
import Scope from './Scope';
import Logger from './Logger';

class Sandbox implements SandboxType {
  parser: ParserType | undefined;

  lastCode: string[] | undefined;

  lastFunc: string | undefined;

  error: Error | undefined;

  logger: Logger;

  constructor() {
    this.parser = new Parser();
    this.logger = new Logger();
    this.reset();
  }

  reset() {
    this.lastCode = undefined;
    this.lastFunc = undefined;
    this.error = undefined;
  }

  async parse(source: string) {
    if (this.parser) {
      return this.parser.parse(source);
    }
    return source;
  }

  async execute(code: string[]) {
    const funcs: string[] = [];
    let func: string = this.lastFunc as string;
    const scope = new Scope(this.logger);
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const c of code) {
        // eslint-disable-next-line no-await-in-loop
        const parsed = await this.parse(c);
        // eslint-disable-next-line no-new-func
        func = parsed;
        this.lastFunc = func;
        funcs.push(func);
      }
    } catch (error) {
      this.error = error;
      this.lastFunc = undefined;
      this.lastCode = undefined;
      this.logger.log('preprocessing error', error);
    }

    if (this.lastFunc) {
      try {
        let resp;
        // eslint-disable-next-line no-restricted-syntax
        for (func of funcs) {
          console.log('exec=', this.logger.out);
          this.logger.clear();
          // eslint-disable-next-line no-eval
          // eslint-disable-next-line no-new-func
          scope.execute(func);
        }
        if (resp) {
          this.logger.print(resp);
        }
        console.log('out=', scope.logger, resp);
      } catch (error) {
        this.logger.log('execution error');
        this.logger.log(error);
        this.error = error;
      }
    }
    return this.logger.out;
  }
}

export default Sandbox;
