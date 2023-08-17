import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { sync } from "rimraf";

sync("dist");

export default [
  "mjs","min.mjs","js","min.js"
].map((ext) => ["comlink","node-adapter"].map(
  (moduleName) => [moduleName, ext])
)).flatMap(
  ([moduleName, ext]) => ({
    input: `./src/${input}.ts`,
    output: {
      name: "Comlink",
      file: `dist/${moduleName}/${moduleName}.${ext}`,
      format: ext.endsWith("mjs") ? 'esm' : 'umd',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: true,
          declarationDir: ".",
          sourceMap: true,
          outDir: "dist",
        },
      }),
      ext.startsWith("min") && terser({
          compress: true,
          mangle: true,
      })
    ].filter(Boolean),
  })
);
