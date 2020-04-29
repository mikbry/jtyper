/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LoggerType } from '../../../types';

class Scope {
  code?: string;

  logger: LoggerType;

  constructor(logger: LoggerType) {
    this.logger = logger;
  }

  print(string: string) {
    this.logger.print(string);
  }

  // eslint-disable-next-line class-methods-use-this
  storeVars(target: any) {
    console.log('storeVars', target);
    return new Proxy(target, {
      set(t, prop) {
        console.log('set', t, prop);
        return true;
      },
      get(t, prop) {
        console.log('get', t, prop);
        return (prop in t ? t : window)[prop];
      },
      apply(t, prop) {
        console.log('apply', t, prop);
        return (prop in t ? t : window)[prop];
      },
    });
  }

  execute(code: string) {
    this.code = code;
    // const ext = `let vars = {};\nwith(this.storeVars({})) {\n${code}\n}\nreturn vars;`;
    // console.log(ext);
    // eslint-disable-next-line no-new-func
    const func = new Function(code).bind(this);
    this.storeVars(func);
    const t = func();
    console.log('scope this', t);
  }
}

export default Scope;
