/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ScopeType, DataType } from '../../../types';

type MessageType = { print?: { value?: DataType }; result?: DataType; type?: string };

const startTimeout = (callback: Function, timeout: number) => {
  if (timeout === -1) {
    callback();
    return 0;
  }
  return setTimeout(timeout, callback);
};

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
  const global = {}; 
  onmessage=(e)=> {
    const data = e.data;
    if (data.type === 'execute') {
      let code = data.scripts[0];
      let result;
      var e = null;
      (async () => { return Function(code).bind(self)(); })().then(result => {
        postMessage({ type: data.type, scopeId: data.scopeId, result });   
      }); 
    }
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
      const handle = startTimeout(() => {
        this.kill();
        reject(new Error('Timeout Error'));
      }, timeout);
      worker.onmessage = e => {
        clearTimeout(handle);
        // console.log('onmessage', e);
        const data: MessageType = e.data as MessageType;
        if (data.type === 'execute') {
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
      worker.postMessage({ type: 'execute', scopeId: scope.id, scripts: [script] });
    });
  }
}

export default ScriptWorker;
