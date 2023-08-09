import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from "vite-plugin-style-import";
import { fileURLToPath, URL } from "node:url";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    Components({
      dirs: ["src/components", "packages", "lib"],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less",
        }),
      ],
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
    }),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 配置ant-design-vue样式变量
        modifyVars: {
          "primary-color": "#ff6720",
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      // {
      //   find: new RegExp("nfeng-ui-vue3"),
      //   replacement: path.resolve(__dirname, "src/index.ts"),
      // },
    ],
  },
});
