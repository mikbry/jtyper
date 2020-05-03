/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as acorn from 'acorn';
import { ParserType, CodeType, ScopeType } from '../../../types/sandbox';

const funcWhitelist: Record<string, string> = {
  print: 'print',
};

interface ESTreeNode extends acorn.Node {
  body: ESTreeNode[];
  type: string;
  kind?: string;
  name?: string;
  id?: ESTreeNode;
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
        const type = element.kind as string;
        const { declarations } = element;
        declarations.forEach(declaration => {
          const id = declaration.id as ESTreeNode;
          const name = id.name as string;
          code.variables[name] = { type, value: undefined };
          variables[name] = { type, value: undefined };
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
