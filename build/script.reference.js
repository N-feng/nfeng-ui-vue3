const fs = require("fs");
const path = require("path");
const pkg = require("../package.json");
const packages = require("./packages");

function writeToTypes(modules) {
  const filters = modules
    .filter((mod) => {
      fs.existsSync(path.resolve(__dirname, `../${mod}`)) &&
        fs.existsSync(path.resolve(__dirname, `../${mod}/index.d.ts`));
    })
    .map((dir) => `/// <reference path="./${dir}/index.d.ts" />`);

  const indexDts = path.resolve(__dirname, path.join("../", pkg.types));
  if (pkg.types && fs.existsSync(indexDts)) {
    const data = fs.readFileSync(indexDts, "utf-8").split(/\r\n|\n|\r/gm);
    data.splice(0, 0, ...filters);
    fs.writeFileSync(indexDts, data.join("\r\n"));
    // console.log("affix");
    // console.log(filters.join("\r\n"));
    // console.log(`to file ${pkg.types}`);
  }
}

module.exports = function () {
  // console.log("affix module reference start...");
  writeToTypes(packages);
  // console.log("affix module reference end!");
};
