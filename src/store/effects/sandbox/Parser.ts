/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as acorn from 'acorn';
import { ParserType, CodeType, ScopeType, DataType } from '../../../types/sandbox';

const funcWhitelist: Record<string, string> = {
  print: 'print',
};

interface ESTreeNode extends acorn.Node {
  body: ESTreeNode[];
  type: string;
  kind?: string;
  name?: string;
  value?: string | number | boolean | object | Function;
  id?: ESTreeNode;
  init?: ESTreeNode;
  declarations: ESTreeNode[];
  expression: {
    type: string;
    callee: {
      name: string;
      start: number;
    };
    start: number;
    end: number;
  };
}

class Parser implements ParserType {
  last: string | undefined;

  async parse(input: string, scope: ScopeType) {
    const { variables } = scope;
    let parsed = input;
    const code: CodeType = { variables: {}, funcs: {}, script: input };
    const tree = acorn.parse(input) as ESTreeNode;
    // console.log('tree', tree);
    tree.body.forEach(element => {
      if (element.type === 'VariableDeclaration') {
        const kind = element.kind as string;
        const { declarations } = element;
        declarations.forEach(declaration => {
          const id = declaration.id as ESTreeNode;
          const init = declaration.init as ESTreeNode;
          // console.log('id=', id, init);
          const name = id.name as string;
          let { value } = init;
          let type = typeof init.value as DataType;
          if (init.type === 'ArrayExpression') {
            type = 'array';
            value = input.substring(init.start, init.end);
          } else if (init.type === 'ObjectExpression') {
            type = 'object';
            value = input.substring(init.start, init.end);
          } else if (init.type === 'ArrowFunctionExpression') {
            type = 'function';
            value = input.substring(init.start, init.end);
          }
          if (variables[name] && variables[name].value && value === undefined) {
            ({ value } = variables[name]);
          }
          code.variables[name] = { kind, value, type };
          variables[name] = { kind, value, type };
          // console.log('var=', name, variables[name]);
        });
      } else if (element.type === 'ExpressionStatement' && element.expression.type === 'CallExpression') {
        const { expression } = element;
        const { name, start } = expression.callee;
        let renamedTo = 'stub';
        if (funcWhitelist[name]) {
          renamedTo = funcWhitelist[name];
        }
        if (renamedTo !== name) {
          const s = parsed.substring(0, start);
          const e = parsed.substring(start + name.length);
          parsed = s + renamedTo + e;
        }
        code.funcs[name] = { start, renamedTo };
      }
    });
    // console.log('variables=', variables);
    // parsed = parsed.replace(/print\(/g, 'print(');
    this.last = parsed;
    code.script = parsed;
    return code;
  }
}

export default Parser;
