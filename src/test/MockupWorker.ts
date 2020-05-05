/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

type UrlType = { blob: Blob };
type DataType = { data: string[] };

const createObjectURL = (blob: Blob): UrlType => ({ blob });

const script = `
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
  url: { blob: Blob };

  onmessage: Function = () => {
    //
  };

  onerror: Function = () => {
    //
  };

  constructor(url: UrlType) {
    this.url = url;
  }

  async handleMessage(e: DataType) {
    const code = script + e.data[0];
    try {
      // eslint-disable-next-line no-new-func
      const result = Function(code).bind(this)();
      if (this.onmessage) this.onmessage({ data: { result } });
    } catch (err) {
      if (this.onerror) this.onerror(err);
    }
  }

  postMessage(msg: string[]) {
    this.handleMessage({ data: msg });
  }
}

Object.defineProperty(window, 'Worker', {
  value: MockupWorker,
});

Object.defineProperty(window, 'URL', {
  value: { createObjectURL },
});
