/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ScriptWorker from './ScriptWorker';
import '../../../test/MockupWorker';
import Scope from './Scope';
import Logger from './Logger';

test('ScriptWorker should init correctly', () => {
  const sw = new ScriptWorker();
  expect(sw).toBeDefined();
});

test('ScriptWorker should timeout', async () => {
  const sw = new ScriptWorker();
  let error;
  try {
    await sw.execute('let hello', new Scope(new Logger()), -1);
  } catch (e) {
    error = e;
  }
  sw.kill();
  sw.getWorker();
  // console.log(error);
  expect(error.message).toBe('Timeout Error');
});
