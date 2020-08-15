/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserType, SandboxType, CodeType, ScopeType, LogEntryType, ModuleType } from '../../../types';
import Parser from './Parser';
import Scope from './Scope';
import Logger from './Logger';
import ScriptWorker from './ScriptWorker';

class Sandbox implements SandboxType {
  parser: ParserType;

  lastCode?: string[];

  lastFunc?: CodeType;

  error?: Error;

  logger: Logger;

  scriptWorker: ScriptWorker;

  scope?: ScopeType;

  modules: Record<string, ModuleType>;

  constructor(noConsole = false) {
    this.parser = new Parser();
    this.logger = new Logger(noConsole ? {} : { console });
    this.scriptWorker = new ScriptWorker();
    this.modules = {};
    this.reset();
  }

  reset() {
    this.lastCode = undefined;
    this.lastFunc = undefined;
    this.error = undefined;
  }

  setModules(modules: Record<string, ModuleType>) {
    this.modules = modules;
  }

  async parse(input: string, scope: ScopeType, index: number): Promise<CodeType> {
    return this.parser.parse(input, scope, index);
  }

  async execute(code: string[], all = false) {
    const out: LogEntryType[][] = [];
    const funcs: CodeType[] = [];
    let func: CodeType = this.lastFunc as CodeType;
    const scope = new Scope(this.logger);
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const c of code) {
        // eslint-disable-next-line no-await-in-loop
        const parsed = await this.parse(c, scope, funcs.length);
        Object.keys(parsed.imports).forEach((i) => {
          if (this.modules[i]) {
            parsed.imports[i].url = this.modules[i].url;
            this.scriptWorker.addModule(this.modules[i]);
          } else {
            throw new Error(`Import not available: ${i}`);
          }
        });
        // eslint-disable-next-line no-new-func
        func = parsed;
        this.lastFunc = func;
        funcs.push(func);
      }
    } catch (error) {
      this.error = error;
      this.lastFunc = undefined;
      this.lastCode = undefined;
      this.logger.log(error);
    }
    let err;
    if (this.lastFunc) {
      await this.scriptWorker.loadModules();
      let index = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (func of funcs) {
        this.logger.clear();
        if (err) {
          this.logger.log(err);
        }
        try {
          index += 1;
          // eslint-disable-next-line no-await-in-loop
          await scope.bindCode(func, this.scriptWorker, index - 1);
        } catch (error) {
          if (!err) {
            this.logger.log(error);
            err = error;
          }
          this.error = error;
        }
        if (all) {
          out.push([...this.logger.out]);
        }
      }
    }
    if (out.length === 0) {
      out.push([...this.logger.out]);
    }
    this.scope = scope;
    return out;
  }
}

export default Sandbox;
