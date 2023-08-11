import path from "path";

const resolve = (p) => path.resolve(__dirname, "../", p);

module.exports = {
  utils: resolve("src/utils"),
};