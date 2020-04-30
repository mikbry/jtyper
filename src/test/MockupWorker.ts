/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const createObjectURL = (url: Blob) => url;

class MockupWorker {
  url: string;

  onmessage: Function = () => ({});

  onerror: Function = () => {
    //
  };

  constructor(stringUrl: string) {
    this.url = stringUrl;
  }

  postMessage(msg: any) {
    this.onmessage(msg);
  }
}

Object.defineProperty(window, 'Worker', {
  value: MockupWorker,
});

Object.defineProperty(window, 'URL', {
  value: { createObjectURL },
});
