import typescript from "rollup-plugin-typescript2";
import vue from "@vitejs/plugin-vue"; // 处理vue文件
import babel from "@rollup/plugin-babel";
import { resolve } from "path";

export default function genConfig(module) {
  return {
    input: `packages/${module}/index.ts`,
    output: {
      name: "index",
      file: `dist/${module}.esm.js`,
      format: "esm",
    },
    plugins: [
      typescript({
        clean: true,
        tsconfig: resolve(__dirname, `../packages/${module}/tsconfig.json`),
      }),
      vue({
        reactivityTransform: true,
      }),
      babel({
        exclude: "node_modules/**",
        extensions: [".js", ".jsx", ".vue", ".tsx"],
        babelHelpers: "bundled",
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.5%, not dead",
            },
          ],
          "@babel/preset-typescript",
        ],
        // plugins: ["@vue/babel-plugin-jsx"],
      }),
    ],
    external: ["vue"],
  };
}
