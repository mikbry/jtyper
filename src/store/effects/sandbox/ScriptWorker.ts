/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ScopeType } from '../../../types';

type DataType = { print?: Text; result?: any };

class ScriptWorker {
  private worker?: Worker;

  private response = `
  const print = (text) => {
    postMessage({ print: text })
  };
  const stub = () => {
    // TODO throw an error
  };
  onmessage=(e)=> {
    let code = e.data[0];
    let result;
    var e = null;
    result = Function(code).bind(self)();
    postMessage({result});  
  }`;

  constructor() {
    this.createWorker();
  }

  createWorker() {
    const blob = new Blob([this.response], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));
  }

  getWorker() {
    if (!this.worker) {
      this.createWorker();
    }
    return this.worker;
  }

  kill() {
    if (this.worker) {
      this.worker.terminate();
    }
    this.worker = undefined;
  }

  public async execute(script: string, scope: ScopeType, timeout = 1000): Promise<string> {
    const worker = this.getWorker() as Worker;
    return new Promise((resolve, reject) => {
      const handle = setTimeout(() => {
        // console.log('worker timeout');
        this.kill();
        reject(new Error('Timeout Error'));
      }, timeout);
      worker.onmessage = e => {
        clearTimeout(handle);
        // console.log('onmessage', e);
        const data: DataType = e.data as DataType;
        if (data.result) {
          resolve(data.result);
        } else if (data.print) {
          // console.log('print', data.print);
          scope.print(data.print);
        }
      };
      worker.onerror = e => {
        // console.log('worker error', e);
        clearTimeout(handle);
        reject(e);
      };
      worker.postMessage([script]);
    });
  }
}

export default ScriptWorker;
