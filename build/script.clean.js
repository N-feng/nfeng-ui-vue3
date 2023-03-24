const pkg = require("../package.json");
const fsExtra = require("fs-extra");
const path = require("path");

module.exports = function () {
  pkg.files.forEach((dir) => {
    fsExtra.removeSync(path.resolve(__dirname, `../${dir}`));
  });
}
