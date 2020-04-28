/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface ParserType {
  parse: Function;
}

export interface SandboxType {
  parser?: ParserType;
  parse: Function;
  execute: Function;
}
