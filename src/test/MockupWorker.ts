/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line max-classes-per-file
type UrlType = { blob: BlobEx };
type DataType = { scripts: string[]; type?: string; scopeId?: string };

const createObjectURL = (blob: BlobEx): UrlType => ({ blob });

class BlobEx {
  s: string[];

  constructor(s: []) {
    this.s = s;
  }
}

const script = `
let localscope = {};
const print = (_value) => {
  let value = _value;
  if (typeof value === 'function') value = 'Function';
  this.onmessage({ data: { print: { value } } })
};
const stub = () => {
  // TODO throw an error
}; \n
`;

class MockupWorker {
  url: { blob: BlobEx };

  end?: boolean;

  onmessage: Function = () => {
    //
  };

  onerror: Function = () => {
    //
  };

  constructor(url: UrlType) {
    this.url = url;
    // console.log('url=', url);
  }

  terminate() {
    //
    this.end = true;
  }

  stub() {
    this.end = undefined;
  }

  print(_value?: unknown) {
    if (_value === undefined) return;
    let value = _value;
    if (typeof value === 'function') value = 'Function';
    this.onmessage({ data: { print: { value } } });
  }

  async handleMessage(data: DataType) {
    const { blob } = this.url;
    blob.s[blob.s.length - 1] = script;
    const code = script + data.scripts[0];
    const scripts = blob.s.join('');
    if (this.onmessage) this.onmessage({ data: {} }); // Coverage dummy test
    try {
      // eslint-disable-next-line no-new-func
      Function(scripts).bind(this)();
      // console.log(code);
      // eslint-disable-next-line no-new-func
      const result = Function(code).bind(this)();
      if (this.onmessage) this.onmessage({ data: { type: data.type, scopeId: data.scopeId, result } });
    } catch (err) {
      if (this.onerror) this.onerror(err);
    }
  }

  postMessage(data: DataType) {
    this.handleMessage(data);
  }
}

Object.defineProperty(window, 'Worker', {
  value: MockupWorker,
});

Object.defineProperty(window, 'URL', {
  value: { createObjectURL },
});

Object.defineProperty(window, 'Blob', {
  value: BlobEx,
});
