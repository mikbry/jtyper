/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';
import { LocalContextType } from '../types';

const context = createContext<Partial<LocalContextType>>({});

export default context;
