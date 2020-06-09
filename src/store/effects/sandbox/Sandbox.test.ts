/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Sandbox from './Sandbox';
import '../../../test/MockupWorker';
import { ScopeType } from '../../../types';

Object.defineProperty(window, 'fetch', {
  value: async () => ({
    blob: async () =>
      'const f = { test: () => { print("Hello"); } }; if (!window.foo) Object.defineProperty(window, "foo", { value: f });\n',
  }),
});

const code1 = `
print('Hello world!');

const value = true;
const str = 'hello';
const array = ["1",2,3,4];
const obj = { id: 1, name: 'name' };
const func = (v) => {
  if (v) return 'nok';
  return 'ok'
};

let v;

print(v);

print(func());
print(1/0);
let d = undefined;
print(d);
d = null;
print(d);
d = Number(undefined);
print(d);
// print(a);
v
`;

const code2 = `
v = 4;
let z = 'true';
forbidden(z);
`;

const code3 = `
v += 2;
z = false;
const b = 'ok';
`;

test('Sandbox should init correctly', () => {
  const sandbox = new Sandbox();
  expect(sandbox).toBeDefined();
});

test('Sandbox should execute hello world!', async () => {
  const sandbox = new Sandbox();
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const [out] = await sandbox.execute(['"hello world!"']);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('hello world!');
  expect(out[0].type).toBe('text');
  expect(out[0].id).toBeDefined();
});

test('Sandbox should not execute syntax error code', async () => {
  const sandbox = new Sandbox(true);
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const [out] = await sandbox.execute(['hello world!']);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('Unexpected token (1:6)');
  expect(out[0].type).toBe('error');
  expect(out[0].id).toBeDefined();
});

test('Sandbox should out execution error code', async () => {
  const sandbox = new Sandbox(true);
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const [out] = await sandbox.execute(['h[1].param = true;']);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('ReferenceError: h is not defined');
  expect(out[0].type).toBe('error');
  expect(out[0].id).toBeDefined();
});

test('Sandbox should stop execution on previous error', async () => {
  const sandbox = new Sandbox(true);
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const [out] = await sandbox.execute(['h[1].param = true;', 'p[0].param=2']);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('ReferenceError: h is not defined');
  expect(out[0].type).toBe('error');
  expect(out[0].id).toBeDefined();
});

test('Sandbox should execute and return all variables', async () => {
  const sandbox = new Sandbox(true);
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const [out] = await sandbox.execute([code1]);
  expect(out.length).toBe(8);
  expect(out[0].text).toBe('Hello world!');
  expect(out[0].type).toBe('text');
  expect(out[0].id).toBeDefined();
  const scope = sandbox.scope as ScopeType;
  expect(Object.keys(scope.variables).length).toBe(7);
  expect(scope.variables.value.kind).toBe('const');
  expect(scope.variables.value.value).toBe(true);
  expect(scope.variables.value.type).toBe('boolean');
  expect(scope.variables.str.kind).toBe('const');
  expect(scope.variables.str.value).toBe('hello');
  expect(scope.variables.str.type).toBe('string');
  expect(scope.variables.array.kind).toBe('const');
  expect(scope.variables.array.value).toStrictEqual(['1', 2, 3, 4]);
  expect(scope.variables.array.type).toBe('array');
  expect(scope.variables.obj.kind).toBe('const');
  expect(scope.variables.obj.value).toStrictEqual({ id: 1, name: 'name' });
  expect(scope.variables.obj.type).toBe('object');
  expect(scope.variables.func.kind).toBe('const');
  expect(scope.variables.func.value).toBe("(v) => {\n  if (v) return 'nok';\n  return 'ok'\n}");
  expect(scope.variables.func.type).toBe('function');
  expect(scope.variables.v.kind).toBe('let');
  expect(scope.variables.v.value).toBe(undefined);
  expect(scope.variables.v.type).toBe('undefined');
  expect(scope.variables.d.kind).toBe('let');
  expect(scope.variables.d.value).toBe(NaN);
  expect(scope.variables.d.type).toBe('number');
});

test('Sandbox should execute several codes and return all variables', async () => {
  const sandbox = new Sandbox(true);
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const [out] = await sandbox.execute([code1, code2, code3]);
  expect(out.length).toBe(0);
  const scope = sandbox.scope as ScopeType;
  expect(Object.keys(scope.variables).length).toBe(9);
  expect(scope.variables.value.kind).toBe('const');
  expect(scope.variables.value.value).toBe(true);
  expect(scope.variables.value.type).toBe('boolean');
  expect(scope.variables.str.kind).toBe('const');
  expect(scope.variables.str.value).toBe('hello');
  expect(scope.variables.str.type).toBe('string');
  expect(scope.variables.array.kind).toBe('const');
  expect(scope.variables.array.value).toStrictEqual(['1', 2, 3, 4]);
  expect(scope.variables.array.type).toBe('array');
  expect(scope.variables.obj.kind).toBe('const');
  expect(scope.variables.obj.value).toStrictEqual({ id: 1, name: 'name' });
  expect(scope.variables.obj.type).toBe('object');
  expect(scope.variables.func.kind).toBe('const');
  expect(scope.variables.func.value).toBe("(v) => {\n  if (v) return 'nok';\n  return 'ok'\n}");
  expect(scope.variables.func.type).toBe('function');
  expect(scope.variables.v.kind).toBe('let');
  expect(scope.variables.v.value).toBe(6);
  expect(scope.variables.v.type).toBe('number');
  expect(scope.variables.d.kind).toBe('let');
  expect(scope.variables.d.value).toBe(NaN);
  expect(scope.variables.d.type).toBe('number');
  expect(scope.variables.z.kind).toBe('let');
  expect(scope.variables.z.value).toBe(false);
  expect(scope.variables.z.type).toBe('boolean');
  expect(scope.variables.b.kind).toBe('const');
  expect(scope.variables.b.value).toBe('ok');
  expect(scope.variables.b.type).toBe('string');
});

test('Sandbox should import module', async () => {
  const sandbox = new Sandbox(true);
  sandbox.setModules({ test: { name: 'test', url: 'test' } });
  const [out] = await sandbox.execute(['import "test";', 'import * as test from "test";', 'foo.test();']);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('Hello');
  expect(out[0].type).toBe('text');
  expect(out[0].id).toBeDefined();
});

test('Sandbox should not import unknown module', async () => {
  const sandbox = new Sandbox(true);
  // sandbox.setModules({ test: { name: 'test', url: 'test' } });
  const [out] = await sandbox.execute([
    'import test, { a, b as c } from "test";',
    'import test, { a, b } from "test";',
    'foo.test();',
  ]);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('Import not available: test');
  expect(out[0].type).toBe('error');
  expect(out[0].id).toBeDefined();
});
