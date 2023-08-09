import vue from "@vitejs/plugin-vue"; // 处理vue文件
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import path from "path";

const packages = require("./build/packages");

const paths = packages.reduce((obj, module) => ({
  ...obj,
}), {});

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
      postcss({
        use: [["sass", { javascriptEnabled: true }]],
        modules: true,
      }),
    ],
    external: ["vue"],
  };
}

export default [
  // ...packages.map(genConfig),
  {
    input: "src/index.ts",
    output: {
      format: "esm",
      dir: "dist",
      paths,
    },
    plugins: [
      typescript({
        clean: true,
        // Absolute path to import correct config in e2e tests
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
        plugins: ["@vue/babel-plugin-jsx"],
      }),
      postcss({
        extract: true,
      }),
    ],
    external: ["vue", "ant-design-vue"],
  },
];
