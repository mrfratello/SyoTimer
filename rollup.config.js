import { terser } from "rollup-plugin-terser";
const pkg = require("./package.json");

function getToday() {
  var today = new Date();
  return [today.getFullYear(), today.getMonth() + 1, today.getDate()].join(".");
}

export default {
  input: "source/jquery.syotimer.js",
  external: ["jquery"],
  output: [
    {
      file: "./build/jquery.syotimer.js",
      format: "iife",
      globals: {
        jquery: "$",
      },
      banner: `/**
 * ${pkg.projectName} - ${pkg.description}
 * @version: ${pkg.version}
 * @author: ${pkg.author}
 * @homepage: ${pkg.homepage}
 * @repository: ${pkg.repository.url}
 * @date: ${getToday()}
 * @license: under MIT license
 */`,
    },
    {
      file: "./build/jquery.syotimer.min.js",
      format: "iife",
      globals: {
        jquery: "$",
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
};
