/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ScopeType, DataType } from '../../../types';

type MessageType = { print?: { value?: DataType }; result?: DataType };

class ScriptWorker {
  private worker?: Worker;

  private response = `
  const print = (_value) => {
    let value = _value;
    if (typeof value === 'function') value = 'Function';
    postMessage({ print: { value } })
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

  public async execute(script: string, scope: ScopeType, timeout = 1000): Promise<DataType> {
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
        const data: MessageType = e.data as MessageType;
        if (data.result) {
          resolve(data.result);
        } else if (data.print) {
          // console.log('print', data.print);
          scope.print(data.print.value);
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
