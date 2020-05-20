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

  async bindCode(code: CodeType, runner: { execute: Function }) {
    const { script } = code;
    let start = '';
    let end = '\n// */\nreturn {';
    let names = Object.keys(code.imports);
    if (names.length) {
      names.forEach(importName => {
        start += `self.importScripts('http://localhost:9010/modules/${code.imports[importName].url}')\n`;
      });
      start += '\n';
    }

    names = Object.keys(this.variables);
    if (names.length > 0) {
      names.forEach(varName => {
        // console.log(varName, this.variables[varName], code.variables[varName]);
        if (!code.variables[varName]) {
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
        const va = this.variables[varName];
        if (
          va.kind === 'let' ||
          (va.kind === 'const' && (va.value === undefined || va.type === 'array' || va.type === 'object'))
        ) {
          end += ` ${varName},`;
        }
      });
      end = `${end.substring(0, end.length - 1)} `;
    }
    end += '};';
    // console.log('start=', start);
    // console.log('end=', end);
    const sse = start + script + end;
    // console.log(sse);
    const response = await runner.execute(sse, this);
    // console.log('response=', response);
    Object.keys(response).forEach(varName => {
      const value = response[varName];
      this.variables[varName].value = value;
      if (Array.isArray(value)) {
        this.variables[varName].type = 'array';
      } else if (typeof value === 'object') {
        this.variables[varName].type = 'object';
      } else if (typeof value === 'string') {
        this.variables[varName].type = 'string';
      } else if (typeof value === 'boolean') {
        this.variables[varName].type = 'boolean';
      } else if (typeof value === 'number') {
        this.variables[varName].type = 'number';
      } /* else if (typeof value === 'bigint') {
        this.variables[varName].type = 'bigint';
      } */
      // console.log('response=', response[varName]);
    });
  }
}

export default Scope;
