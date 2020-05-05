/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Sandbox from './Sandbox';
import '../../../test/MockupWorker';

test('Sandbox should init correctly', () => {
  const sandbox = new Sandbox();
  expect(sandbox).toBeDefined();
});

test('Sandbox should execute hello world!', async () => {
  const sandbox = new Sandbox();
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const out = await sandbox.execute(['"hello world!"']);
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
  const out = await sandbox.execute(['hello world!']);
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
  const out = await sandbox.execute(['h[1].param = true;']);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('h is not defined');
  expect(out[0].type).toBe('error');
  expect(out[0].id).toBeDefined();
});

test('Sandbox should stop execution on previous error', async () => {
  const sandbox = new Sandbox(true);
  Object.defineProperty(window, 'print', {
    value: sandbox.logger.print.bind(sandbox.logger),
  });
  const out = await sandbox.execute(['h[1].param = true;', 'p[0].param=2']);
  expect(out.length).toBe(1);
  expect(out[0].text).toBe('h is not defined');
  expect(out[0].type).toBe('error');
  expect(out[0].id).toBeDefined();
});
