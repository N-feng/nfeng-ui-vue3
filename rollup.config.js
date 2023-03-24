import typescript from "rollup-plugin-typescript2";
import vue from "@vitejs/plugin-vue"; // 处理vue文件
import babel from "@rollup/plugin-babel";
import path from "path";

const packages = require("./build/packages");
console.log('packages: ', packages);

function genConfig(module) {
  return {
    input: `packages/${module}/index.ts`,
    output: {
      format: "esm",
      dir: module,
    },
    plugins: [
      typescript({
        clean: true,
        tsconfig: path.resolve(__dirname, `tsconfig.json`),
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

export default [
  ...packages.map(genConfig),
];
