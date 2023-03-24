const fs = require("fs");
const path = require("path");

console.log(fs.readdirSync(path.resolve(__dirname, "../packages")));

module.exports = fs.readdirSync(path.resolve(__dirname, "../packages"));
