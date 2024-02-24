import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

export default [
  {
    input: 'source/index.ts',
    external: ['jquery'],
    output: [
      {
        file: './build/jquery.syotimer.js',
        format: 'iife',
        globals: {
          jquery: 'jQuery',
        },
        banner: `/**
 * ${pkg.projectName} - ${pkg.description}
 * @version: ${pkg.version}
 * @author: ${pkg.author}
 * @homepage: ${pkg.homepage}
 * @repository: ${pkg.repository.url}
 * @license: under MIT license
 */`,
      },
      {
        file: './build/jquery.syotimer.min.js',
        format: 'iife',
        globals: {
          jquery: 'jQuery',
        },
        sourcemap: true,
        banner: `/**
 * ${pkg.projectName} v.${pkg.version} | under MIT license
 * ${pkg.homepage}
 */`,

        plugins: [
          terser({
            output: {
              comments: (_node, { type, value }) => type === 'comment2' && /license/i.test(value),
            },
          }),
        ],
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.lib.json',
      }),
    ],
  },
  {
    input: './index.d.ts',
    output: [{ file: 'build/jquery.syotimer.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
