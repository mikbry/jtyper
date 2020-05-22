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
  local: ESTreeNode;
  imported: ESTreeNode;
  source: ESTreeNode;
  specifiers: ESTreeNode[];
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
    let offset = 0;
    const code: CodeType = { variables: {}, funcs: {}, imports: {}, script: input };
    const tree = acorn.parse(input, {
      sourceType: 'module',
      allowImportExportEverywhere: true,
      allowAwaitOutsideFunction: true,
    }) as ESTreeNode;
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
          let value;
          let type: DataType = 'undefined';
          if (init) {
            ({ value } = init);
            type = typeof init.value as DataType;
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
          }
          /* if (variables[name] && variables[name].value && value === undefined) {
            ({ value } = variables[name]);
          } */
          code.variables[name] = { kind, value, type };
          variables[name] = { kind, value, type };
          // console.log('var=', name, variables[name]);
        });
      } else if (element.type === 'ExpressionStatement' && element.expression.type === 'CallExpression') {
        const { expression } = element;
        const { name, start } = expression.callee;
        if (!name) {
          console.log('todo call without name', expression);
        } else {
          let renamedTo = 'stub';
          if (funcWhitelist[name]) {
            renamedTo = funcWhitelist[name];
          }
          if (renamedTo !== name) {
            const s = parsed.substring(0, start + offset);
            const e = parsed.substring(start + offset + name.length);
            parsed = s + renamedTo + e;
            offset += renamedTo.length - name.length;
          }
          code.funcs[name] = { start, renamedTo };
        }
      } else if (
        element.type === 'ExpressionStatement' &&
        element.expression.type !== 'AssignmentExpression' &&
        element.expression.type !== 'AwaitExpression'
      ) {
        // console.log('expression=', element);
        const { expression } = element;
        let { start, end } = expression;
        start += offset;
        end += offset;
        const exp = parsed.substring(start, end);
        const s = parsed.substring(0, start);
        const e = parsed.substring(start + exp.length);
        parsed = `${s}print(${exp})${e}`;
        offset += 'print()'.length;
        // console.log('exp', exp, start, end);
      } else if (element.type === 'ImportDeclaration') {
        const source = element.source as ESTreeNode;
        const name = source.value as string;
        const specifiers: Array<{ name: string; type: string; alias?: string }> = [];
        element.specifiers.forEach(sp => {
          let type = '';
          if (sp.type === 'ImportNamespaceSpecifier') {
            type = 'namespace';
          } else if (sp.type === 'ImportDefaultSpecifier') {
            type = 'default';
          } else {
            // } if (sp.type === 'ImportSpecifier') {
            type = 'export';
          }
          let n = sp.local.name as string;
          if (sp.imported && sp.imported.name !== n) {
            const alias = n;
            n = sp.imported.name as string;
            specifiers.push({ name: n, type, alias });
          } else {
            specifiers.push({ name: n, type });
          }
        });
        const { start } = element;
        code.imports[name] = { start, specifiers };
        const s = parsed.slice(0, start);
        const e = parsed.slice(start);
        parsed = `${s}// ${e}`;
        offset += 3;
        // console.log('import=', code.imports[name]);
      }
    });
    // console.log('variables=', variables);
    // console.log('parsed', parsed);
    this.last = parsed;
    code.script = parsed;
    return code;
  }
}

export default Parser;
