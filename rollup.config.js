import { createRequire } from "module";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import summary from "rollup-plugin-summary";

const require = createRequire(import.meta.url);
const tsconfig = require("./tsconfig.json");
const pkg = require("./package.json");
const name = pkg.main.replace(/\.js$/, "");

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
});

export default [
  bundle({
    plugins: [
      esbuild(),
      typescript(tsconfig),
      nodeResolve({ preferBuiltins: false }),
      terser({
        module: true,
      }),
      summary(),
    ],
    output: [
      {
        file: `${name}.mjs`,
        format: "es",
        sourcemap: true
      },
      {
        file: `${name}`,
        format: "cjs",
        sourcemap: true
      },
    ],
    external: [
      'axios'
    ]
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es",
    },
  }),
];
