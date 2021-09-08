import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
const pkg = require("./package.json");

export default [
  {
    input: "source/index.ts",
    external: ["jquery"],
    output: [
      {
        file: "./build/jquery.syotimer.js",
        format: "iife",
        globals: {
          jquery: "jQuery",
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
        file: "./build/jquery.syotimer.min.js",
        format: "iife",
        globals: {
          jquery: "jQuery",
        },
        sourcemap: true,
        banner: `/**
 * ${pkg.projectName} v.${pkg.version} | under MIT license
 * ${pkg.homepage}
 */`,

        plugins: [
          terser({
            output: {
              comments: function (_node, comment) {
                const type = comment.type;
                const text = comment.value;
                return type === "comment2" && /license/i.test(text);
              },
            },
          }),
        ],
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
  {
    input: "./index.d.ts",
    output: [{ file: "build/jquery.syotimer.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
