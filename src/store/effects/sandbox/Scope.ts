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
      if (!code.variables[varName] && this.variables[varName].type !== 'function') {
        const variable = this.variables[varName];
        // Not present in code block, add it
        start += variable.kind === 'const' ? 'const ' : 'let ';
        start += varName;
        let { value } = variable;
        if (value && (variable.type === 'object' || variable.type === 'array')) {
          value = `JSON.parse('${JSON.stringify(value)}')`;
        } else if (value && variable.type === 'string') {
          value = `'${value}'`;
        }
        // console.log('name=', varName, value);
        start += value === undefined ? ';\n' : ` = ${value};\n`;
      }
      if (this.variables[varName].type !== 'function') {
        end += ` ${varName},`;
      }
    });
    end += '};';
    // console.log('start=', start);
    // console.log('end=', end);
    const sse = start + script + end;
    console.log(sse);
    const response = await runner.execute(sse, this);
    // console.log('response=', response);
    Object.keys(response).forEach(varName => {
      this.variables[varName].value = response[varName];
      // console.log('response=', response[varName]);
    });
  }
}

export default Scope;
