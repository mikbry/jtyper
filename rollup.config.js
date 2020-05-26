/* eslint-disable import/no-extraneous-dependencies */
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import hotcss from 'rollup-plugin-hot-css';
import commonjs from 'rollup-plugin-commonjs-alternate';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const appName = 'rollupReactApp';
const NODE_ENV = process.env.NODE_ENV || 'development';
const production = NODE_ENV !== 'development' && NODE_ENV !== 'test';
const development = NODE_ENV === 'development';
const outputFile = production ? 'js/index' : '/index.[hash]';
const publicUrl = process.env.PUBLIC_URL || 'http://localhost:9000';
const esmFile = `${outputFile}.js`;
const iifeFile = `${outputFile}.legacy.js`;
const styles = development ? '/styles.[hash].css' : 'css/styles.css';

const genScripts = () => {
  let scripts = `<script async type="module" src="/${esmFile}"></script>`;
  if (production) {
    scripts += `<script nomodule src="/${iifeFile}"></script>`;
  }
  return scripts;
};

const watch = () => ({
  exclude: [
    'build/favicon.ico',
    'build/logo192.png',
    'build/logo512.png',
    'build/manifest.json',
    'build/robots.txt',
    'build/index.html',
  ],
});

const plugins = () => [
  copy({
    targets: [
      {
        src: [
          'public/favicon.ico',
          'public/logo192.png',
          'public/logo512.png',
          'public/manifest.json',
          'public/robots.text',
        ],
        dest: 'build',
      },
      {
        src: 'public/index.html',
        dest: 'build',
        transform: contents =>
          contents
            .toString()
            .replace('%SCRIPTS%', genScripts())
            .replace(/%PUBLIC_URL%/g, publicUrl)
            .replace('%STYLES%', styles),
      },
    ],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
  json(),
  nodePolyfills(),
  resolve({ preferBuiltins: true }),
  typescript({ abortOnError: false }),
  hotcss({
    hot: development,
    filename: development ? 'styles.css' : 'css/styles.css',
  }),
  string({
    include: ['**/*.fs', '**/*.vs'],
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react/index.js': [
        'cloneElement',
        'forwardRef',
        'createContext',
        'Component',
        'createElement',
        'useMemo',
        'useEffect',
        'useState',
        'useRef',
        'useCallback',
        'useContext',
        'useLayoutEffect',
        'useReducer',
        'Children',
        'isValidElement',
        'useDebugValue',
      ],
      'node_modules/react-dom/index.js': ['render', 'hydrate'],
      'node_modules/react-is/index.js': [
        'isElement',
        'isValidElementType',
        'ForwardRef'
      ]
    } 
  }),
  production && terser(),
];

const esm = {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'esm',
    entryFileNames: development ? '[name].[hash].js' : 'js/[name].js',
    assetFileNames: development ? '[name].[hash][extname]' : '[name][extname]',
    sourcemap: true,
  },
  watch: watch(),
  plugins: plugins(),
};

const iife = {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'iife',
    entryFileNames: 'js/[name].legacy.js',
    assetFileNames: development ? '[name][hash][extname]' : '[name][extname]',
    name: appName,
    sourcemap: true,
  },
  watch: watch(),
  plugins: plugins(),
};

const config = [esm];
if (production) {
  config.push(iife);
}
export default config;
