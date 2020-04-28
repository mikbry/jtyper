/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserType } from '../../../types/sandbox';

class Parser implements ParserType {
  last: string | undefined;

  async parse(text: string) {
    let parsed = text;
    parsed = parsed.replace(/print\(/g, 'this.print(');
    this.last = parsed;
    return parsed;
  }
}

export default Parser;
