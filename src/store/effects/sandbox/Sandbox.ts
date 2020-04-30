/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserType, SandboxType, CodeType, ScopeType } from '../../../types';
import Parser from './Parser';
import Scope from './Scope';
import Logger from './Logger';

class Sandbox implements SandboxType {
  parser: ParserType | undefined;

  lastCode: string[] | undefined;

  lastFunc: CodeType | undefined;

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

  async parse(input: string, scope: ScopeType): Promise<CodeType> {
    if (this.parser) {
      return this.parser.parse(input, scope);
    }
    return { script: input, variables: {} };
  }

  static runner(script: string, scope: ScopeType) {
    // eslint-disable-next-line no-new-func
    return new Function(script).bind(scope)();
  }

  async execute(code: string[]) {
    const funcs: CodeType[] = [];
    let func: CodeType = this.lastFunc as CodeType;
    const scope = new Scope(this.logger);
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const c of code) {
        // eslint-disable-next-line no-await-in-loop
        const parsed = await this.parse(c, scope);
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
        // eslint-disable-next-line no-restricted-syntax
        for (func of funcs) {
          this.logger.clear();
          scope.bindCode(func, Sandbox.runner);
        }
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
