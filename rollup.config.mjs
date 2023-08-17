import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { sync } from "rimraf";

const createRollupConfig = ({ moduleName, ext = "js" }) => ({
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
});


sync("dist");

export default [
  { input: "comlink", ext: "mjs" },
  { input: "comlink", ext: "min.mjs" },
  { input: "comlink", ext: "js" },
  { input: "comlink", ext: "min.js" },
  { input: "comlink", ext: "js" },
  { input: "comlink", ext: "min.js" },
  { input: "node-adapter", ext: "mjs" },
  { input: "node-adapter", ext: "min.mjs" },
  { input: "node-adapter", ext: "js" },
  { input: "node-adapter", ext: "min.js" },
].map(createRollupConfig);
