/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    fill(data: Record<string, string>) {
      Object.keys(data).forEach((key) => {
        this.setItem(key, data[key]);
      });
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

export default localStorageMock;
