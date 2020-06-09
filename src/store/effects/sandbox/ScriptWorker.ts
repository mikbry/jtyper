/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ScopeType, DataType, ModuleType } from '../../../types';

type MessageType = { print?: { value?: DataType }; result?: DataType; type?: string };

const startTimeout = (callback: Function, timeout: number) => {
  if (timeout === -1) {
    callback();
    return 0;
  }
  return setTimeout(timeout, callback);
};

class ScriptWorker {
  private modules: Record<string, ModuleType>;

  private worker?: Worker;

  private globalScript = `
  const global = {}; 
  `;

  private handlerScript = `
  let data;
  let localscope = {};
  const print = (_value) => {
    let value = _value;
    if (typeof value === 'function') value = 'Function';
    postMessage({ print: { value } })
  };
  const stub = () => {
    // TODO throw an error
  };
  let prevconsolelog = console.log;
  console.log = (_text) => {
    print(_text);
  };


  onmessage=(e)=> {
    // console.log('worker onmessage=' + e.data.type);
    data = e.data;
    if (data.type === 'execute') {
      let code = data.scripts[0];
      let result;
      Function(\`(async (data) => {\n\` + code + \`\n})(data).then(result => {
        localscope = { ...localscope, ...result };
        const r = JSON.parse(JSON.stringify(result));
        // console.log('post message r=' + r);
        postMessage({ type: data.type, scopeId: data.scopeId, result: r });  
      }, error => { 
        const r = error.toString();
        // console.error(r); 
        postMessage({ type: 'error', scopeId: data.scopeId, result: r }); 
      });\`)(); 
    }
  };\n`;

  constructor() {
    this.modules = {};
  }

  addModule(module: ModuleType) {
    if (!this.modules[module.name]) {
      this.modules[module.name] = module;
      this.kill();
    }
  }

  async loadModules() {
    const keys = Object.keys(this.modules);
    const loader = keys
      .filter(m => !this.modules[m].data)
      .map(k => {
        const module = this.modules[k];
        const asyncFetch = async () => {
          // console.log('load module=', module.url);
          const response = await fetch(module.url);
          module.data = await response.blob();
          // console.log('loaded module=', !!module.data);
          return 'ok';
        };
        return asyncFetch;
      });
    // console.log('loader', loader[0]);
    await Promise.all(loader);
    // eslint-disable-next-line no-restricted-syntax
    for await (const l of loader) {
      await l();
    }
  }

  async createWorker() {
    if (this.worker) {
      return;
    }
    const modules: Blob[] = Object.keys(this.modules)
      .map(m => this.modules[m].data)
      .filter(d => !!d) as Blob[];
    // console.log('createWorker modules=', modules);
    const blob = new Blob([this.globalScript, ...modules, this.handlerScript], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));
  }

  getWorker(): Worker {
    return this.worker as Worker;
  }

  kill() {
    if (this.worker) {
      this.worker.terminate();
    }
    this.worker = undefined;
  }

  public async execute(script: string, scope: ScopeType, timeout = 1000): Promise<DataType> {
    await this.createWorker();
    const worker = this.getWorker();
    return new Promise((resolve, reject) => {
      const handle = startTimeout(() => {
        this.kill();
        reject(new Error('Timeout Error'));
      }, timeout);
      worker.onmessage = e => {
        clearTimeout(handle);
        // console.log('exec onmessage', e.data);
        const data: MessageType = e.data as MessageType;
        if (data.type === 'execute') {
          // console.log('result=', data.result);
          resolve(data.result);
        } else if (data.print) {
          scope.print(data.print.value);
        } else if (data.type === 'error') {
          reject(data.result);
        }
      };
      worker.onerror = e => {
        // console.log('worker error', e);
        clearTimeout(handle);
        reject(e);
      };
      // console.log('postMessage', worker);
      worker.postMessage({ type: 'execute', scopeId: scope.id, scripts: [script] });
    });
  }
}

export default ScriptWorker;
