import { defineConfig } from "vite";
import VitePluginVuedoc, { vueDocFiles } from "vite-plugin-vuedoc";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from "vite-plugin-style-import";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: Number(process.env.SERVER_PORT || 3000),
  },
  plugins: [
    VitePluginVuedoc({
      markdownIt: { plugins: [] },
      previewComponent: 'preview',
    }),
    Vue({
      include: [...vueDocFiles],
    }),
    VueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    Components({
      dirs: ["src/components", "src/packages"],
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
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

