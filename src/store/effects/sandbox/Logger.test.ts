/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Logger from './Logger';

test('Logger should init correctly', () => {
  const log = new Logger();
  expect(log).toBeDefined();
});

test('Logger should print a text', () => {
  const log = new Logger();
  log.print('A text');
  expect(log.out.length).toBe(1);
  expect(log.out[0].text).toBe('A text');
  expect(log.out[0].type).toBe('text');
  expect(log.out[0].id).toBeDefined();
});

test('Logger should add an error', () => {
  const log = new Logger();
  log.error('An error', new Error('The error'));
  expect(log.out.length).toBe(2);
  expect(log.out[0].text).toBe('An error');
  expect(log.out[0].type).toBe('error');
  expect(log.out[0].id).toBeDefined();
  expect(log.out[1].text).toBe('The error');
  expect(log.out[1].type).toBe('error');
  expect(log.out[1].id).toBeDefined();
});

test('Logger should add an info', () => {
  const log = new Logger();
  log.info('An info', NaN);
  expect(log.out.length).toBe(2);
  expect(log.out[0].text).toBe('An info');
  expect(log.out[0].type).toBe('info');
  expect(log.out[0].id).toBeDefined();
  expect(log.out[1].text).toBe('NaN');
  expect(log.out[1].type).toBe('info');
  expect(log.out[1].id).toBeDefined();
});

test('Logger should add a warn', () => {
  const log = new Logger();
  log.warn('A warn', undefined, []);
  expect(log.out.length).toBe(3);
  expect(log.out[0].text).toBe('A warn');
  expect(log.out[0].type).toBe('warn');
  expect(log.out[0].id).toBeDefined();
  expect(log.out[1].text).toBe('undefined');
  expect(log.out[1].type).toBe('warn');
  expect(log.out[1].id).toBeDefined();
  expect(log.out[2].text).toBe('[]');
  expect(log.out[2].type).toBe('warn');
  expect(log.out[2].id).toBeDefined();
});

test('Logger should add a log', () => {
  const log = new Logger();
  log.log('A log', null, 0);
  expect(log.out.length).toBe(3);
  expect(log.out[0].text).toBe('A log');
  expect(log.out[0].type).toBe('log');
  expect(log.out[0].id).toBeDefined();
  expect(log.out[1].text).toBe('null');
  expect(log.out[1].type).toBe('log');
  expect(log.out[1].id).toBeDefined();
  expect(log.out[2].text).toBe('0');
  expect(log.out[2].type).toBe('log');
  expect(log.out[2].id).toBeDefined();
});

test('Logger should use console', () => {
  let out: unknown[] = [];
  const csl = {
    log: (...args: unknown[]) => {
      out = args;
    },
  };
  const log = new Logger({ console: csl });
  log.log('A log', null, 0);
  expect(log.out.length).toBe(3);
  expect(out.length).toBe(3);
  expect(out[0]).toBe('A log');
  expect(out[1]).toBe(null);
  expect(out[2]).toBe(0);
});
