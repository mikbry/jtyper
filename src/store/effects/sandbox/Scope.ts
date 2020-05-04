/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LoggerType, ScopeType, CodeType, VariableType } from '../../../types';

class Scope implements ScopeType {
  variables: Record<string, VariableType> = {};

  code?: string;

  logger: LoggerType;

  constructor(logger: LoggerType) {
    this.logger = logger;
  }

  print(string: string) {
    this.logger.print(string);
  }

  async bindCode(code: CodeType, runner: any) {
    const { script } = code;
    let start = '';
    let end = '\n// */\nreturn {';
    Object.keys(this.variables).forEach(varName => {
      // console.log(varName, this.variables[varName], code.variables[varName]);
      if (!code.variables[varName]) {
        // Not present in code block, add it
        start += this.variables[varName].kind === 'const' ? 'const ' : 'let ';
        start += varName;
        // TODO transform value to its string representation
        start += this.variables[varName].value === undefined ? ';\n' : ` = ${this.variables[varName].value};`;
      }
      end += ` ${varName},`;
    });
    end += '};';
    // console.log('start=', start);
    // console.log('end=', end);
    const sse = start + script + end;
    // console.log(sse);
    const response = await runner.execute(sse, this);
    // console.log('response=', response);
    Object.keys(response).forEach(varName => {
      // TODO sanitize response: NaN, Objects / Functions, ...
      this.variables[varName].value = response[varName];
    });
  }
}

export default Scope;
